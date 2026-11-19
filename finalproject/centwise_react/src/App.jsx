import React, { useState, useEffect, useMemo } from 'react';

const getFutureDate = (daysFromNow) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

const INITIAL_SUBSCRIPTIONS = [
  {
    id: 1,
    serviceName: 'Netflix',
    category: 'Entertainment',
    cost: 649,
    billingCycle: 'monthly',
    renewalDate: getFutureDate(2),
    paymentMethod: 'Credit Card',
    subscriptionLink: 'https://www.netflix.com',
    isShared: false,
    friends: []
  },
  {
    id: 2,
    serviceName: 'Spotify Premium',
    category: 'Music',
    cost: 119,
    billingCycle: 'monthly',
    renewalDate: getFutureDate(5),
    paymentMethod: 'UPI',
    subscriptionLink: 'https://www.spotify.com/in-en/premium/',
    isShared: true,
    friends: [
      { id: 101, email: 'rahul@example.com', share: 39.67 },
      { id: 102, email: 'aman@example.com', share: 39.66 }
    ]
  },
  {
    id: 3,
    serviceName: 'Adobe Creative Cloud',
    category: 'Productivity',
    cost: 3499,
    billingCycle: 'annual',
    renewalDate: getFutureDate(22),
    paymentMethod: 'UPI',
    subscriptionLink: 'https://www.adobe.com',
    isShared: false,
    friends: []
  }
];

const MARKETPLACE_SERVICES = [
  {
    id: 'netflix',
    name: 'Netflix',
    category: 'Entertainment',
    image: '/netflix.png',
    badge: 'MOST POPULAR',
    badgeClass: 'popular',
    stars: '⭐⭐⭐⭐⭐',
    reviews: '(4.5/5 - 2.3M reviews)',
    url: 'https://www.netflix.com',
    plans: [
      { name: 'Mobile', price: 149, cycle: 'monthly', label: '₹149/mo', features: ['480p quality on mobile/tablet', '1 device at a time'] },
      { name: 'Basic', price: 199, cycle: 'monthly', label: '₹199/mo', features: ['720p HD quality', '1 device at a time'] },
      { name: 'Standard', price: 499, cycle: 'monthly', label: '₹499/mo', features: ['1080p Full HD quality', '2 devices simultaneously'] },
      { name: 'Premium', price: 649, cycle: 'monthly', label: '₹649/mo', features: ['4K Ultra HD quality', '4 devices simultaneously'] }
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    category: 'Music',
    image: '/spotify.png',
    badge: 'BEST VALUE',
    badgeClass: 'best-value',
    stars: '⭐⭐⭐⭐⭐',
    reviews: '(4.7/5 - 1.8M reviews)',
    url: 'https://www.spotify.com/in-en/premium/',
    plans: [
      { name: 'Free', price: 0, cycle: 'monthly', label: '₹0/mo', features: ['Shuffle play with ads', 'Limited skips'] },
      { name: 'Individual', price: 119, cycle: 'monthly', label: '₹119/mo', features: ['Ad-free music', 'Offline downloads', 'Unlimited skips'] },
      { name: 'Duo', price: 149, cycle: 'monthly', label: '₹149/mo', features: ['2 Premium accounts', 'Duo Mix playlist'] },
      { name: 'Family', price: 179, cycle: 'monthly', label: '₹179/mo', features: ['Up to 6 Premium accounts', 'Family Mix & Kids app'] }
    ]
  },
  {
    id: 'primevideo',
    name: 'Amazon Prime Video',
    category: 'Entertainment',
    image: '/primevideo.png',
    badge: '',
    badgeClass: '',
    stars: '⭐⭐⭐⭐',
    reviews: '(4.2/5 - 1.5M reviews)',
    url: 'https://www.primevideo.com',
    plans: [
      { name: 'Monthly', price: 299, cycle: 'monthly', label: '₹299/mo', features: ['Unlimited streaming', 'Multiple devices', 'Free delivery benefits'] },
      { name: 'Annual', price: 1499, cycle: 'annual', label: '₹1,499/yr', features: ['Save ₹2,089 per year', 'All monthly benefits', 'Prime Music included'] }
    ]
  },
  {
    id: 'adobe',
    name: 'Adobe Creative Cloud',
    category: 'Productivity',
    image: '/adobe.png',
    badge: 'PROFESSIONAL',
    badgeClass: '',
    stars: '⭐⭐⭐⭐⭐',
    reviews: '(4.6/5 - 890K reviews)',
    url: 'https://www.adobe.com',
    plans: [
      { name: 'Photography', price: 999, cycle: 'monthly', label: '₹999/mo', features: ['Photoshop & Lightroom', '20GB cloud storage'] },
      { name: 'Single App', price: 1799, cycle: 'monthly', label: '₹1,799/mo', features: ['Any one app of your choice', '100GB cloud storage'] },
      { name: 'All Apps', price: 4599, cycle: 'monthly', label: '₹4,599/mo', features: ['20+ creative apps', '100GB cloud storage', 'Adobe Fonts & Portfolio'] }
    ]
  },
  {
    id: 'googleone',
    name: 'Google One',
    category: 'Cloud Storage',
    image: '/googleone.png',
    badge: '',
    badgeClass: '',
    stars: '⭐⭐⭐⭐',
    reviews: '(4.3/5 - 750K reviews)',
    url: 'https://one.google.com/about/plans',
    plans: [
      { name: '100 GB', price: 130, cycle: 'monthly', label: '₹130/mo', features: ['100GB storage', 'Google experts support'] },
      { name: '200 GB', price: 210, cycle: 'monthly', label: '₹210/mo', features: ['200GB storage', 'Share with 5 members'] },
      { name: '2 TB', price: 650, cycle: 'monthly', label: '₹650/mo', features: ['2TB storage', 'VPN & Dark web monitoring', '10% Google Store rewards'] }
    ]
  },
  {
    id: 'cultfit',
    name: 'Cult.fit',
    category: 'Fitness',
    image: '/cultfit.png',
    badge: 'TRENDING',
    badgeClass: 'best-value',
    stars: '⭐⭐⭐⭐',
    reviews: '(4.4/5 - 520K reviews)',
    url: 'https://www.cult.fit',
    plans: [
      { name: 'Cult Pass Live', price: 699, cycle: 'monthly', label: '₹699/mo', features: ['Unlimited live classes', 'Yoga, dance, cardio'] },
      { name: 'Cult Pass PRO', price: 1499, cycle: 'monthly', label: '₹1,499/mo', features: ['Gym + Group classes', '2 centers access'] },
      { name: 'Cult Pass Elite', price: 2199, cycle: 'monthly', label: '₹2,199/mo', features: ['All center access', 'Personal training sessions', 'At-home workouts'] }
    ]
  }
];

const calculateDaysRemaining = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);
  const diffTime = target - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatDisplayDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export default function App() {
  const [page, setPage] = useState(() => {
    const savedUser = localStorage.getItem('centwise_user');
    return savedUser ? 'dashboard' : 'landing';
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('centwise_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    const saved = localStorage.getItem('centwise_subscriptions');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [editingSubId, setEditingSubId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [sortBy, setSortBy] = useState('Renewal Date');

  const [marketSearch, setMarketSearch] = useState('');
  const [marketCategory, setMarketCategory] = useState('all');
  const [selectedPlans, setSelectedPlans] = useState({
    netflix: 3,
    spotify: 1,
    primevideo: 0,
    adobe: 0,
    googleone: 0,
    cultfit: 0
  });
  const [compareIds, setCompareIds] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('centwise_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('centwise_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('centwise_user');
    }
  }, [user]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleLogin = (email) => {
    setUser({ name: email.split('@')[0], email });
    setPage('dashboard');
    triggerToast('Logged in successfully');
  };

  const handleRegister = (name, email) => {
    setUser({ name, email });
    setPage('dashboard');
    triggerToast('Account created successfully');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('landing');
  };

  const handleDeleteSubscription = (id) => {
    setSubscriptions((prev) => prev.filter((item) => item.id !== id));
    triggerToast('Subscription deleted');
  };

  const handleSaveSubscription = (subData) => {
    if (editingSubId) {
      setSubscriptions((prev) =>
        prev.map((item) => (item.id === editingSubId ? { ...subData, id: editingSubId } : item))
      );
      setEditingSubId(null);
      triggerToast('Subscription updated');
    } else {
      setSubscriptions((prev) => [...prev, { ...subData, id: Date.now() }]);
      triggerToast('Subscription added');
    }
    setPage('dashboard');
  };

  const handleQuickSubscribe = (service) => {
    const planIdx = selectedPlans[service.id] ?? 0;
    const plan = service.plans[planIdx];
    const newSub = {
      id: Date.now(),
      serviceName: `${service.name} (${plan.name})`,
      category: service.category,
      cost: plan.price,
      billingCycle: plan.cycle,
      renewalDate: getFutureDate(plan.cycle === 'annual' ? 365 : 30),
      paymentMethod: 'UPI',
      subscriptionLink: service.url,
      isShared: false,
      friends: []
    };
    setSubscriptions((prev) => [...prev, newSub]);
    triggerToast(`Added ${service.name} - ${plan.name} to your dashboard!`);
  };

  const toggleCompare = (serviceId) => {
    setCompareIds((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      }
      if (prev.length >= 3) {
        triggerToast('You can compare up to 3 services at once');
        return prev;
      }
      return [...prev, serviceId];
    });
  };

  const stats = useMemo(() => {
    let monthlyTotal = 0;
    let annualTotal = 0;
    let renewalsThisWeek = 0;

    subscriptions.forEach((sub) => {
      const friendShareSum = sub.isShared
        ? sub.friends.reduce((acc, f) => acc + Number(f.share || 0), 0)
        : 0;
      const effectiveCost = Math.max(0, Number(sub.cost) - friendShareSum);

      if (sub.billingCycle === 'monthly') {
        monthlyTotal += effectiveCost;
        annualTotal += effectiveCost * 12;
      } else {
        monthlyTotal += effectiveCost / 12;
        annualTotal += effectiveCost;
      }

      const days = calculateDaysRemaining(sub.renewalDate);
      if (days >= 0 && days <= 7) {
        renewalsThisWeek += 1;
      }
    });

    return {
      totalCount: subscriptions.length,
      monthlyCost: Math.round(monthlyTotal),
      annualCost: Math.round(annualTotal),
      renewalsThisWeek
    };
  }, [subscriptions]);

  const urgentAlertSub = useMemo(() => {
    const upcoming = subscriptions
      .map((s) => ({ ...s, daysLeft: calculateDaysRemaining(s.renewalDate) }))
      .filter((s) => s.daysLeft >= 0 && s.daysLeft <= 3)
      .sort((a, b) => a.daysLeft - b.daysLeft);
    return upcoming[0] || null;
  }, [subscriptions]);

  const filteredSubscriptions = useMemo(() => {
    let list = [...subscriptions];
    if (categoryFilter !== 'All Categories') {
      list = list.filter((s) => s.category === categoryFilter);
    }
    if (sortBy === 'Renewal Date') {
      list.sort((a, b) => new Date(a.renewalDate) - new Date(b.renewalDate));
    } else if (sortBy === 'Cost (High to Low)') {
      list.sort((a, b) => Number(b.cost) - Number(a.cost));
    } else if (sortBy === 'Name (A-Z)') {
      list.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
    }
    return list;
  }, [subscriptions, categoryFilter, sortBy]);

  const filteredMarketServices = useMemo(() => {
    return MARKETPLACE_SERVICES.filter((srv) => {
      const matchesCat =
        marketCategory === 'all' ||
        srv.category.toLowerCase().includes(marketCategory.toLowerCase());
      const q = marketSearch.trim().toLowerCase();
      const matchesQuery =
        !q ||
        srv.name.toLowerCase().includes(q) ||
        srv.category.toLowerCase().includes(q) ||
        srv.plans.some((p) => p.name.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [marketSearch, marketCategory]);

  const activeUserEmail = user?.email || 'user@example.com';

  if (page === 'landing') {
    return (
      <div className="landing-bg-wrapper">
        <div className="container">
          <header className="landing-header">
            <div className="header-content">
              <div style={{ cursor: 'pointer' }} onClick={() => setPage('landing')}>
                <img src="/logo1.png" alt="Centwise" width="auto" height="40" />
              </div>
              <div className="auth-section">
                <button className="btn btn-secondary" onClick={() => setPage('login')}>
                  Login
                </button>
                <button className="btn btn-primary" onClick={() => setPage('register')}>
                  Sign Up
                </button>
              </div>
            </div>
          </header>

          <div className="landing">
            <h1>Track Your Subscriptions Smartly</h1>
            <p>Never miss a renewal date. Save money by managing all your subscriptions in one place.</p>
            <button className="btn btn-primary btn-large" onClick={() => setPage('register')}>
              Get Started Free
            </button>
          </div>

          <div className="features">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track All Subscriptions</h3>
              <p>Keep all your subscriptions organized in one place</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Renewal Alerts</h3>
              <p>Get notified before your subscriptions renew</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Save Money</h3>
              <p>Track spending and cancel unused subscriptions</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === 'login') {
    return <LoginView onLogin={handleLogin} onNavigate={setPage} />;
  }

  if (page === 'register') {
    return <RegisterView onRegister={handleRegister} onNavigate={setPage} />;
  }

  return (
    <div className="container">
      <header>
        <div className="header-content">
          <a
            href="#dashboard"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              setEditingSubId(null);
              setPage('dashboard');
            }}
          >
            <img src="/logo1.png" alt="Centwise" width="auto" height="50" />
          </a>
          <div className="user-info">
            <button
              className={`btn ${page === 'dashboard' ? 'btn-primary' : 'btn-secondary'} btn-small`}
              onClick={() => {
                setEditingSubId(null);
                setPage('dashboard');
              }}
            >
              Dashboard
            </button>
            <button
              className={`btn ${page === 'marketplace' ? 'btn-primary' : 'btn-secondary'} btn-small`}
              onClick={() => setPage('marketplace')}
            >
              Marketplace
            </button>
            <span className="user-email">{activeUserEmail}</span>
            <button className="btn btn-danger btn-small" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {page === 'dashboard' && (
        <div className="dashboard">
          {urgentAlertSub && (
            <div className="alert alert-danger">
              ⚠ <strong>{urgentAlertSub.serviceName}</strong> renews in{' '}
              {urgentAlertSub.daysLeft === 0
                ? 'today!'
                : `${urgentAlertSub.daysLeft} day${urgentAlertSub.daysLeft > 1 ? 's' : ''}!`}
            </div>
          )}

          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">Total Subscriptions</div>
              <div className="stat-value">{stats.totalCount}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Monthly Cost</div>
              <div className="stat-value">₹{stats.monthlyCost.toLocaleString('en-IN')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Annual Cost</div>
              <div className="stat-value">₹{stats.annualCost.toLocaleString('en-IN')}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Renewals This Week</div>
              <div className="stat-value">{stats.renewalsThisWeek}</div>
            </div>
          </div>

          <div className="controls">
            <div className="controls-row">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingSubId(null);
                  setPage('form');
                }}
              >
                ➕ Add Subscription
              </button>
              <div className="filter-group">
                <label>Filter by Category:</label>
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                  <option value="All Categories">All Categories</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Education">Education</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Cloud Storage">Cloud Storage</option>
                  <option value="Music">Music</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="Renewal Date">Renewal Date</option>
                  <option value="Cost (High to Low)">Cost (High to Low)</option>
                  <option value="Name (A-Z)">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {filteredSubscriptions.length === 0 ? (
            <div className="empty-state">
              <h3>No subscriptions found</h3>
              <p style={{ margin: '10px 0 20px' }}>
                Click "Add Subscription" or explore the Marketplace to get started.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingSubId(null);
                  setPage('form');
                }}
              >
                ➕ Add Your First Subscription
              </button>
            </div>
          ) : (
            <div className="subscriptions-grid">
              {filteredSubscriptions.map((sub) => {
                const daysLeft = calculateDaysRemaining(sub.renewalDate);
                let cardStatusClass = '';
                if (daysLeft >= 0 && daysLeft <= 3) {
                  cardStatusClass = 'danger';
                } else if (daysLeft > 3 && daysLeft <= 7) {
                  cardStatusClass = 'warning';
                }

                const friendShareSum = sub.isShared
                  ? sub.friends.reduce((sum, f) => sum + Number(f.share || 0), 0)
                  : 0;
                const yourShare = Math.max(0, Number(sub.cost) - friendShareSum);

                return (
                  <div key={sub.id} className={`subscription-card ${cardStatusClass}`}>
                    <div className="sub-header">
                      <div>
                        <div className="sub-name">{sub.serviceName}</div>
                        <span className="sub-category">{sub.category}</span>
                        {sub.isShared && sub.friends.length > 0 && (
                          <div className="split-badge">
                            👥 Split with {sub.friends.length} friend{sub.friends.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="sub-cost">
                      ₹{Number(sub.cost).toLocaleString('en-IN')}/
                      {sub.billingCycle === 'annual' ? 'yr' : 'mo'}
                    </div>

                    <div className="sub-details">
                      <div className="sub-detail-row">
                        <span>Renewal Date:</span>
                        <strong>{formatDisplayDate(sub.renewalDate)}</strong>
                      </div>
                      <div className="sub-detail-row">
                        <span>Days Until Renewal:</span>
                        <strong>
                          {daysLeft < 0
                            ? `${Math.abs(daysLeft)} days overdue`
                            : daysLeft === 0
                            ? 'Today'
                            : `${daysLeft} days`}
                        </strong>
                      </div>
                      {sub.isShared && sub.friends.length > 0 ? (
                        <div className="sub-detail-row">
                          <span>Your Share:</span>
                          <strong>₹{yourShare.toFixed(2)}</strong>
                        </div>
                      ) : (
                        <div className="sub-detail-row">
                          <span>Payment:</span>
                          <strong>{sub.paymentMethod || 'Not specified'}</strong>
                        </div>
                      )}
                    </div>

                    {sub.subscriptionLink && (
                      <a
                        href={sub.subscriptionLink}
                        target="_blank"
                        rel="noreferrer"
                        className="sub-link"
                      >
                        Visit Subscription Portal ↗
                      </a>
                    )}

                    <div className="sub-actions">
                      <button
                        className="btn btn-primary btn-small"
                        onClick={() => {
                          setEditingSubId(sub.id);
                          setPage('form');
                        }}
                      >
                        ✏ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-small"
                        onClick={() => handleDeleteSubscription(sub.id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {page === 'form' && (
        <SubscriptionFormView
          initialData={
            editingSubId ? subscriptions.find((item) => item.id === editingSubId) : null
          }
          onSave={handleSaveSubscription}
          onCancel={() => {
            setEditingSubId(null);
            setPage('dashboard');
          }}
        />
      )}

      {page === 'marketplace' && (
        <div className="marketplace-container">
          <div className="marketplace-header">
            <h1>Subscription Marketplace</h1>
            <p>Compare plans, find the best deals, and subscribe to your favorite services</p>
          </div>

          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="🔍 Search for subscriptions, plans, or services..."
              value={marketSearch}
              onChange={(e) => setMarketSearch(e.target.value)}
            />
            <select
              className="search-input search-select"
              value={marketCategory}
              onChange={(e) => setMarketCategory(e.target.value)}
            >
              <option value="all">Filter By: All</option>
              <option value="entertainment">Entertainment</option>
              <option value="music">Music</option>
              <option value="productivity">Productivity</option>
              <option value="cloud">Cloud Storage</option>
              <option value="fitness">Fitness</option>
            </select>
          </div>

          <div className="comparison-banner">
            <h2>💡 Smart Comparison Tool</h2>
            <p>
              Compare prices, features, and find the perfect plan for your needs (
              {compareIds.length}/3 selected)
            </p>
            <button
              className="btn btn-primary btn-large"
              onClick={() => {
                if (compareIds.length < 2) {
                  triggerToast('Select at least 2 services using Compare buttons below');
                } else {
                  setShowCompareModal(true);
                }
              }}
            >
              Compare Selected Plans ({compareIds.length})
            </button>
          </div>

          <div className="service-grid">
            {filteredMarketServices.map((srv) => {
              const activePlanIdx = selectedPlans[srv.id] ?? 0;
              const isSelectedForCompare = compareIds.includes(srv.id);

              return (
                <div
                  key={srv.id}
                  className={`service-card ${isSelectedForCompare ? 'selected-compare' : ''}`}
                >
                  <div className="service-header">
                    <img src={srv.image} alt={srv.name} />
                  </div>
                  <div className="service-body">
                    {srv.badge && <span className={`badge ${srv.badgeClass}`}>{srv.badge}</span>}
                    <div className="rating">
                      <span className="stars">{srv.stars}</span>
                      <span className="review-count">{srv.reviews}</span>
                    </div>

                    <div className="plans-section">
                      {srv.plans.map((plan, idx) => (
                        <div
                          key={plan.name}
                          className={`plan-item ${activePlanIdx === idx ? 'active-plan' : ''}`}
                          onClick={() =>
                            setSelectedPlans((prev) => ({ ...prev, [srv.id]: idx }))
                          }
                        >
                          <div className="plan-header">
                            <span className="plan-name">{plan.name}</span>
                            <span className="plan-price">{plan.label}</span>
                          </div>
                          <ul className="plan-features">
                            {plan.features.map((feat) => (
                              <li key={feat}>✓ {feat}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="service-actions">
                      <button
                        className="btn-buy"
                        onClick={() => handleQuickSubscribe(srv)}
                      >
                        Subscribe Now
                      </button>
                      <button
                        className={`btn-compare ${isSelectedForCompare ? 'active' : ''}`}
                        onClick={() => toggleCompare(srv.id)}
                      >
                        {isSelectedForCompare ? 'Selected' : 'Compare'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showCompareModal && (
        <div className="modal-overlay" onClick={() => setShowCompareModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="form-header" style={{ marginBottom: 15 }}>
              <h2>Plan Comparison</h2>
              <button
                className="btn btn-secondary btn-small"
                onClick={() => setShowCompareModal(false)}
              >
                Close
              </button>
            </div>
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  {compareIds.map((id) => {
                    const srv = MARKETPLACE_SERVICES.find((s) => s.id === id);
                    return <th key={id}>{srv?.name}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong>Category</strong>
                  </td>
                  {compareIds.map((id) => {
                    const srv = MARKETPLACE_SERVICES.find((s) => s.id === id);
                    return <td key={id}>{srv?.category}</td>;
                  })}
                </tr>
                <tr>
                  <td>
                    <strong>Selected Plan</strong>
                  </td>
                  {compareIds.map((id) => {
                    const srv = MARKETPLACE_SERVICES.find((s) => s.id === id);
                    const plan = srv?.plans[selectedPlans[id] ?? 0];
                    return <td key={id}>{plan?.name}</td>;
                  })}
                </tr>
                <tr>
                  <td>
                    <strong>Price</strong>
                  </td>
                  {compareIds.map((id) => {
                    const srv = MARKETPLACE_SERVICES.find((s) => s.id === id);
                    const plan = srv?.plans[selectedPlans[id] ?? 0];
                    return (
                      <td key={id} style={{ color: '#667eea', fontWeight: 'bold' }}>
                        {plan?.label}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td>
                    <strong>Included Benefits</strong>
                  </td>
                  {compareIds.map((id) => {
                    const srv = MARKETPLACE_SERVICES.find((s) => s.id === id);
                    const plan = srv?.plans[selectedPlans[id] ?? 0];
                    return (
                      <td key={id}>
                        <ul style={{ paddingLeft: 16 }}>
                          {plan?.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td>
                    <strong>Action</strong>
                  </td>
                  {compareIds.map((id) => {
                    const srv = MARKETPLACE_SERVICES.find((s) => s.id === id);
                    return (
                      <td key={id}>
                        <button
                          className="btn-buy"
                          onClick={() => {
                            handleQuickSubscribe(srv);
                            setShowCompareModal(false);
                          }}
                        >
                          Add to Dashboard
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {toastMessage && <div className="toast-banner">{toastMessage}</div>}
    </div>
  );
}

function LoginView({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="landing-bg-wrapper">
      <div className="container">
        <header className="landing-header">
          <div className="header-content">
            <a
              href="#home"
              className="logo"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('landing');
              }}
            >
              <img src="/logo1.png" alt="Centwise" width="auto" height="40" />
            </a>
            <button className="btn btn-secondary btn-small" onClick={() => onNavigate('landing')}>
              Back to Home
            </button>
          </div>
        </header>

        <div className="auth-container">
          <div className="auth-card">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">Login to access your dashboard</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />

              <button type="submit" className="btn btn-primary btn-full">
                Login
              </button>
            </form>

            <div className="auth-footer">
              Don't have an account?{' '}
              <a
                href="#register"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('register');
                }}
              >
                Sign up here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterView({ onRegister, onNavigate }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(name, email);
  };

  return (
    <div className="landing-bg-wrapper">
      <div className="container">
        <header className="landing-header">
          <div className="header-content">
            <a
              href="#home"
              className="logo"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('landing');
              }}
            >
              <img src="/logo1.png" alt="Centwise" width="auto" height="40" />
            </a>
            <button className="btn btn-secondary btn-small" onClick={() => onNavigate('landing')}>
              Back to Home
            </button>
          </div>
        </header>

        <div className="auth-container">
          <div className="auth-card">
            <h2>Create Your Account</h2>
            <p className="auth-subtitle">Start managing your subscriptions today</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <button type="submit" className="btn btn-primary btn-full">
                Create Account
              </button>
            </form>

            <div className="auth-footer">
              Already have an account?{' '}
              <a
                href="#login"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('login');
                }}
              >
                Login here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubscriptionFormView({ initialData, onSave, onCancel }) {
  const [serviceName, setServiceName] = useState(initialData?.serviceName || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [cost, setCost] = useState(initialData?.cost ?? '');
  const [billingCycle, setBillingCycle] = useState(initialData?.billingCycle || 'monthly');
  const [renewalDate, setRenewalDate] = useState(initialData?.renewalDate || '');
  const [paymentMethod, setPaymentMethod] = useState(initialData?.paymentMethod || '');
  const [subscriptionLink, setSubscriptionLink] = useState(
    initialData?.subscriptionLink || ''
  );
  const [isShared, setIsShared] = useState(initialData?.isShared || false);
  const [friends, setFriends] = useState(initialData?.friends || []);
  const [friendEmail, setFriendEmail] = useState('');
  const [friendShare, setFriendShare] = useState('');

  const handleAddFriend = () => {
    if (!friendEmail.trim() || !friendShare) return;
    setFriends((prev) => [
      ...prev,
      { id: Date.now(), email: friendEmail.trim(), share: Number(friendShare) }
    ]);
    setFriendEmail('');
    setFriendShare('');
  };

  const handleRemoveFriend = (id) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      serviceName,
      category,
      cost: Number(cost),
      billingCycle,
      renewalDate,
      paymentMethod,
      subscriptionLink,
      isShared,
      friends: isShared ? friends : []
    });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>{initialData ? 'Edit Subscription' : 'Add New Subscription'}</h2>
          <button type="button" className="btn btn-secondary btn-small" onClick={onCancel}>
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit} className="subscription-form">
          <div className="form-group">
            <label htmlFor="serviceName">Service Name</label>
            <input
              type="text"
              id="serviceName"
              required
              placeholder="e.g., Netflix, Spotify"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Productivity">Productivity</option>
              <option value="Fitness">Fitness</option>
              <option value="Cloud Storage">Cloud Storage</option>
              <option value="Music">Music</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="cost">Cost (₹)</label>
              <input
                type="number"
                id="cost"
                required
                placeholder="0.00"
                step="0.01"
                min="0"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="billingCycle">Billing Cycle</label>
              <select
                id="billingCycle"
                required
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="renewalDate">Renewal Date</label>
            <input
              type="date"
              id="renewalDate"
              required
              value={renewalDate}
              onChange={(e) => setRenewalDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <input
              type="text"
              id="paymentMethod"
              placeholder="e.g., Credit Card, UPI"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subscriptionLink">Subscription Website/Payment Link (Optional)</label>
            <input
              type="url"
              id="subscriptionLink"
              placeholder="https://example.com/subscription"
              value={subscriptionLink}
              onChange={(e) => setSubscriptionLink(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                id="isShared"
                checked={isShared}
                onChange={(e) => setIsShared(e.target.checked)}
              />
              <span>Split with Friends</span>
            </label>
          </div>

          {isShared && (
            <div className="friends-section">
              <label className="section-label">Friends Sharing</label>
              <div className="friends-list">
                {friends.map((friend) => (
                  <div key={friend.id} className="friend-item">
                    <div className="friend-info">
                      <div className="friend-name">{friend.email}</div>
                      <div className="friend-share">₹{Number(friend.share).toFixed(2)}</div>
                    </div>
                    <button
                      type="button"
                      className="btn-remove"
                      onClick={() => handleRemoveFriend(friend.id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="add-friend-row">
                <input
                  type="email"
                  placeholder="Friend's email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Share ₹"
                  step="1"
                  min="0"
                  value={friendShare}
                  onChange={(e) => setFriendShare(e.target.value)}
                />
                <button type="button" className="btn-add-friend" onClick={handleAddFriend}>
                  Add
                </button>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? 'Update Subscription' : 'Save Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
