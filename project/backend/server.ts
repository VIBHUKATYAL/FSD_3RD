import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Dashboard Stats
app.get("/api/dashboard", async (req, res) => {
  try {
    const totalRooms = await prisma.room.count();
    const todaysLectures = await prisma.lecture.count();
    // Assuming for fast prototyping: all calculations simplified
    res.json({
      success: true,
      data: {
        totalRooms,
        todaysLectures,
        occupiedRooms: 0,
        availableRooms: totalRooms,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Rooms List
app.get("/api/rooms", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: [{ floor: "asc" }, { roomNumber: "asc" }],
      include: {
        lectures: { include: { lecturer: true, subject: true, class: true } },
      },
    });
    res.json({ success: true, data: rooms, meta: { total: rooms.length } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Lecturers List
app.get("/api/lecturers", async (req, res) => {
  try {
    const lecturers = await prisma.lecturer.findMany();
    res.json({
      success: true,
      data: lecturers,
      meta: { total: lecturers.length },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Add Lecturer
app.post("/api/lecturers", async (req, res) => {
  try {
    const { name, department } = req.body;
    const lecturer = await prisma.lecturer.create({
      data: { name, department },
    });
    res.json({ success: true, data: lecturer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Add Lecture
app.post("/api/lectures", async (req, res) => {
  try {
    const { roomId, lecturerId, classId, subjectId, date, startTime, endTime } =
      req.body;

    // Check teacher (lecturer) is busy at this time
    const teacherBusy = await prisma.lecture.findFirst({
      where: {
        lecturerId,
        date: new Date(date),
        OR: [{ startTime: { lt: endTime }, endTime: { gt: startTime } }],
      },
    });

    if (teacherBusy) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Lecturer is busy during this time.",
        });
    }

    // Check room is busy
    const roomBusy = await prisma.lecture.findFirst({
      where: {
        roomId,
        date: new Date(date),
        OR: [{ startTime: { lt: endTime }, endTime: { gt: startTime } }],
      },
    });

    if (roomBusy) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Room is occupied during this time.",
        });
    }

    const lecture = await prisma.lecture.create({
      data: {
        roomId,
        lecturerId,
        classId,
        subjectId,
        date: new Date(date),
        startTime,
        endTime,
      },
    });

    res.json({ success: true, data: lecture });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/subjects", async (req, res) => {
  res.json({ success: true, data: await prisma.subject.findMany() });
});
app.get("/api/classes", async (req, res) => {
  res.json({ success: true, data: await prisma.class.findMany() });
});
app.get("/api/lectures", async (req, res) => {
  res.json({
    success: true,
    data: await prisma.lecture.findMany({
      include: { room: true, lecturer: true, class: true, subject: true },
    }),
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
