/**
 * Dynamic Memory Loader & Metadata Processor
 * Automatically imports and maps all 81 photo & video assets from src/assets/memories
 */

// Import all media files dynamically via Vite
const mediaGlob = import.meta.glob('/src/assets/memories/*.{jpg,jpeg,png,mp4,mov,webm,MP.jpg}', { eager: true, import: 'default' });

export const rawMemoriesData = [
  {
    "id": 1,
    "filename": "IMG-20240821-WA0006(1).jpg",
    "type": "image",
    "dateStr": "2024-08-20",
    "dateFormatted": "August 21, 2024",
    "timestamp": 1724169600000,
    "caption": "Your smile in this moment made my whole day brighter ✨",
    "tag": "Sweet Smiles 😊"
  },
  {
    "id": 2,
    "filename": "IMG-20240821-WA0006.jpg",
    "type": "image",
    "dateStr": "2024-08-20",
    "dateFormatted": "August 21, 2024",
    "timestamp": 1724169600000,
    "caption": "A little slice of pure happiness captured forever ❤️",
    "tag": "Golden Hour 🌅"
  },
  {
    "id": 3,
    "filename": "IMG-20240827-WA0003.jpg",
    "type": "image",
    "dateStr": "2024-08-26",
    "dateFormatted": "August 27, 2024",
    "timestamp": 1724688000000,
    "caption": "Looking at this brings back every butterfly I felt that day 🦋",
    "tag": "Special Outing 🍷"
  },
  {
    "id": 4,
    "filename": "IMG-20240830-WA0000(1).jpg",
    "type": "image",
    "dateStr": "2024-08-29",
    "dateFormatted": "August 30, 2024",
    "timestamp": 1724947200000,
    "caption": "One of my absolute favorite memories with you 💖",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 5,
    "filename": "IMG-20240830-WA0000.jpg",
    "type": "image",
    "dateStr": "2024-08-29",
    "dateFormatted": "August 30, 2024",
    "timestamp": 1724947200000,
    "caption": "No matter how many times I look at this, my heart skips a beat 😊",
    "tag": "Cozy Days ☕"
  },
  {
    "id": 6,
    "filename": "IMG-20240830-WA0003.jpg",
    "type": "image",
    "dateStr": "2024-08-29",
    "dateFormatted": "August 30, 2024",
    "timestamp": 1724947200000,
    "caption": "Proof that the best moments in life are spent by your side 🌅",
    "tag": "Unfiltered Joy ✨"
  },
  {
    "id": 7,
    "filename": "IMG-20240916-WA0000(1).jpg",
    "type": "image",
    "dateStr": "2024-09-15",
    "dateFormatted": "September 16, 2024",
    "timestamp": 1726416000000,
    "caption": "You, being effortlessly stunning as always 🥰",
    "tag": "Best Memories 💫"
  },
  {
    "id": 8,
    "filename": "IMG-20240916-WA0000.jpg",
    "type": "image",
    "dateStr": "2024-09-15",
    "dateFormatted": "September 16, 2024",
    "timestamp": 1726416000000,
    "caption": "Every ordinary day becomes extraordinary with you ✨",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 9,
    "filename": "IMG-20240917-WA0007.jpg",
    "type": "image",
    "dateStr": "2024-09-16",
    "dateFormatted": "September 17, 2024",
    "timestamp": 1726502400000,
    "caption": "I remember laughing so hard right around this time 😂💕",
    "tag": "Together Always 🌸"
  },
  {
    "id": 10,
    "filename": "IMG-20240917-WA0009.jpg",
    "type": "image",
    "dateStr": "2024-09-16",
    "dateFormatted": "September 17, 2024",
    "timestamp": 1726502400000,
    "caption": "Holding your hand here felt like coming home 🏡❤️",
    "tag": "Sweet Smiles 😊"
  },
  {
    "id": 11,
    "filename": "IMG-20240917-WA0010.jpg",
    "type": "image",
    "dateStr": "2024-09-16",
    "dateFormatted": "September 17, 2024",
    "timestamp": 1726502400000,
    "caption": "Captured a moment of magic that I will treasure forever 🌟",
    "tag": "Golden Hour 🌅"
  },
  {
    "id": 12,
    "filename": "IMG-20240919-WA0002.jpg",
    "type": "image",
    "dateStr": "2024-09-18",
    "dateFormatted": "September 19, 2024",
    "timestamp": 1726675200000,
    "caption": "My heart is so full every single time I see your cute face 🥰",
    "tag": "Special Outing 🍷"
  },
  {
    "id": 13,
    "filename": "IMG-20240924-WA0000.jpg",
    "type": "image",
    "dateStr": "2024-09-23",
    "dateFormatted": "September 24, 2024",
    "timestamp": 1727107200000,
    "caption": "Unfiltered, unscripted, pure love in one frame 📸❤️",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 14,
    "filename": "IMG-20240924-WA0001.jpg",
    "type": "image",
    "dateStr": "2024-09-23",
    "dateFormatted": "September 24, 2024",
    "timestamp": 1727107200000,
    "caption": "You make every place we go feel like paradise 🌺",
    "tag": "Cozy Days ☕"
  },
  {
    "id": 15,
    "filename": "VID-20241003-WA0001.mp4",
    "type": "video",
    "dateStr": "2024-10-02",
    "dateFormatted": "October 3, 2024",
    "timestamp": 1727884800000,
    "caption": "The girl who makes my world spin in the best way possible 💫",
    "tag": "Live Moment 📽️"
  },
  {
    "id": 16,
    "filename": "IMG-20241004-WA0000(1).jpg",
    "type": "image",
    "dateStr": "2024-10-03",
    "dateFormatted": "October 4, 2024",
    "timestamp": 1727971200000,
    "caption": "Soft laughter, warm hugs, and sweet memories with you ☕💖",
    "tag": "Best Memories 💫"
  },
  {
    "id": 17,
    "filename": "IMG-20241004-WA0000.jpg",
    "type": "image",
    "dateStr": "2024-10-03",
    "dateFormatted": "October 4, 2024",
    "timestamp": 1727971200000,
    "caption": "Forever grateful for this day and for having you in my life 🙏❤️",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 18,
    "filename": "IMG-20241004-WA0001(1).jpg",
    "type": "image",
    "dateStr": "2024-10-03",
    "dateFormatted": "October 4, 2024",
    "timestamp": 1727971200000,
    "caption": "A priceless moment I wish I could replay over and over 🎞️💕",
    "tag": "Together Always 🌸"
  },
  {
    "id": 19,
    "filename": "IMG-20241004-WA0001.jpg",
    "type": "image",
    "dateStr": "2024-10-03",
    "dateFormatted": "October 4, 2024",
    "timestamp": 1727971200000,
    "caption": "Your happiness is my absolute favorite thing in the universe 🌌",
    "tag": "Sweet Smiles 😊"
  },
  {
    "id": 20,
    "filename": "IMG-20241007-WA0003.jpg",
    "type": "image",
    "dateStr": "2024-10-06",
    "dateFormatted": "October 7, 2024",
    "timestamp": 1728230400000,
    "caption": "Looking forward to creating a million more memories like this ✨",
    "tag": "Golden Hour 🌅"
  },
  {
    "id": 21,
    "filename": "IMG-20241007-WA0004.jpg",
    "type": "image",
    "dateStr": "2024-10-06",
    "dateFormatted": "October 7, 2024",
    "timestamp": 1728230400000,
    "caption": "Your smile in this moment made my whole day brighter ✨",
    "tag": "Special Outing 🍷"
  },
  {
    "id": 22,
    "filename": "IMG-20241107-WA0002.jpg",
    "type": "image",
    "dateStr": "2024-11-06",
    "dateFormatted": "November 7, 2024",
    "timestamp": 1730908800000,
    "caption": "A little slice of pure happiness captured forever ❤️",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 23,
    "filename": "VID-20241107-WA0003.mp4",
    "type": "video",
    "dateStr": "2024-11-06",
    "dateFormatted": "November 7, 2024",
    "timestamp": 1730908800000,
    "caption": "Looking at this brings back every butterfly I felt that day 🦋",
    "tag": "Live Moment 📽️"
  },
  {
    "id": 24,
    "filename": "VID-20241109-WA0001.mp4",
    "type": "video",
    "dateStr": "2024-11-08",
    "dateFormatted": "November 9, 2024",
    "timestamp": 1731081600000,
    "caption": "One of my absolute favorite memories with you 💖",
    "tag": "Laughs in Motion 🍿"
  },
  {
    "id": 25,
    "filename": "IMG-20241113-WA0006.jpg",
    "type": "image",
    "dateStr": "2024-11-12",
    "dateFormatted": "November 13, 2024",
    "timestamp": 1731427200000,
    "caption": "No matter how many times I look at this, my heart skips a beat 😊",
    "tag": "Best Memories 💫"
  },
  {
    "id": 26,
    "filename": "IMG-20241114-WA0001(1).jpg",
    "type": "image",
    "dateStr": "2024-11-13",
    "dateFormatted": "November 14, 2024",
    "timestamp": 1731513600000,
    "caption": "Proof that the best moments in life are spent by your side 🌅",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 27,
    "filename": "IMG-20241114-WA0001.jpg",
    "type": "image",
    "dateStr": "2024-11-13",
    "dateFormatted": "November 14, 2024",
    "timestamp": 1731513600000,
    "caption": "You, being effortlessly stunning as always 🥰",
    "tag": "Together Always 🌸"
  },
  {
    "id": 28,
    "filename": "VID-20241119-WA0017.mp4",
    "type": "video",
    "dateStr": "2024-11-18",
    "dateFormatted": "November 19, 2024",
    "timestamp": 1731945600000,
    "caption": "Every ordinary day becomes extraordinary with you ✨",
    "tag": "Laughs in Motion 🍿"
  },
  {
    "id": 29,
    "filename": "IMG-20241120-WA0000(1).jpg",
    "type": "image",
    "dateStr": "2024-11-19",
    "dateFormatted": "November 20, 2024",
    "timestamp": 1732032000000,
    "caption": "I remember laughing so hard right around this time 😂💕",
    "tag": "Golden Hour 🌅"
  },
  {
    "id": 30,
    "filename": "IMG-20241120-WA0000(2).jpg",
    "type": "image",
    "dateStr": "2024-11-19",
    "dateFormatted": "November 20, 2024",
    "timestamp": 1732032000000,
    "caption": "Holding your hand here felt like coming home 🏡❤️",
    "tag": "Special Outing 🍷"
  },
  {
    "id": 31,
    "filename": "IMG-20241120-WA0000.jpg",
    "type": "image",
    "dateStr": "2024-11-19",
    "dateFormatted": "November 20, 2024",
    "timestamp": 1732032000000,
    "caption": "Captured a moment of magic that I will treasure forever 🌟",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 32,
    "filename": "Screenshot_20241123-132215.png",
    "type": "image",
    "dateStr": "2024-11-22",
    "dateFormatted": "November 23, 2024",
    "timestamp": 1732291200000,
    "caption": "My heart is so full every single time I see your cute face 🥰",
    "tag": "Cozy Days ☕"
  },
  {
    "id": 33,
    "filename": "IMG-20241207-WA0001.jpg",
    "type": "image",
    "dateStr": "2024-12-06",
    "dateFormatted": "December 7, 2024",
    "timestamp": 1733500800000,
    "caption": "Unfiltered, unscripted, pure love in one frame 📸❤️",
    "tag": "Unfiltered Joy ✨"
  },
  {
    "id": 34,
    "filename": "IMG-20241217-WA0002(1).jpg",
    "type": "image",
    "dateStr": "2024-12-16",
    "dateFormatted": "December 17, 2024",
    "timestamp": 1734364800000,
    "caption": "You make every place we go feel like paradise 🌺",
    "tag": "Best Memories 💫"
  },
  {
    "id": 35,
    "filename": "IMG-20241217-WA0002(2).jpg",
    "type": "image",
    "dateStr": "2024-12-16",
    "dateFormatted": "December 17, 2024",
    "timestamp": 1734364800000,
    "caption": "The girl who makes my world spin in the best way possible 💫",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 36,
    "filename": "IMG-20241217-WA0002.jpg",
    "type": "image",
    "dateStr": "2024-12-16",
    "dateFormatted": "December 17, 2024",
    "timestamp": 1734364800000,
    "caption": "Soft laughter, warm hugs, and sweet memories with you ☕💖",
    "tag": "Together Always 🌸"
  },
  {
    "id": 37,
    "filename": "FB_IMG_1734694247411.jpg",
    "type": "image",
    "dateStr": "2024-12-20",
    "dateFormatted": "December 20, 2024",
    "timestamp": 1734694247411,
    "caption": "Forever grateful for this day and for having you in my life 🙏❤️",
    "tag": "Sweet Smiles 😊"
  },
  {
    "id": 38,
    "filename": "IMG-20241222-WA0003.jpg",
    "type": "image",
    "dateStr": "2024-12-21",
    "dateFormatted": "December 22, 2024",
    "timestamp": 1734796800000,
    "caption": "A priceless moment I wish I could replay over and over 🎞️💕",
    "tag": "Golden Hour 🌅"
  },
  {
    "id": 39,
    "filename": "Screenshot 2025-02-04 215508.png",
    "type": "image",
    "dateStr": "2025-02-03",
    "dateFormatted": "February 4, 2025",
    "timestamp": 1738598400000,
    "caption": "Your happiness is my absolute favorite thing in the universe 🌌",
    "tag": "Special Outing 🍷"
  },
  {
    "id": 40,
    "filename": "PXL_20250213_095841953.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "Looking forward to creating a million more memories like this ✨",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 41,
    "filename": "PXL_20250213_134616972.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "Your smile in this moment made my whole day brighter ✨",
    "tag": "Cozy Days ☕"
  },
  {
    "id": 42,
    "filename": "PXL_20250213_134638930.MP.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "A little slice of pure happiness captured forever ❤️",
    "tag": "Unfiltered Joy ✨"
  },
  {
    "id": 43,
    "filename": "PXL_20250213_134639588.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "Looking at this brings back every butterfly I felt that day 🦋",
    "tag": "Best Memories 💫"
  },
  {
    "id": 44,
    "filename": "PXL_20250213_134640158.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "One of my absolute favorite memories with you 💖",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 45,
    "filename": "PXL_20250213_134647335.MP.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "No matter how many times I look at this, my heart skips a beat 😊",
    "tag": "Together Always 🌸"
  },
  {
    "id": 46,
    "filename": "PXL_20250213_134649052.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "Proof that the best moments in life are spent by your side 🌅",
    "tag": "Sweet Smiles 😊"
  },
  {
    "id": 47,
    "filename": "PXL_20250213_134658301.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "You, being effortlessly stunning as always 🥰",
    "tag": "Golden Hour 🌅"
  },
  {
    "id": 48,
    "filename": "PXL_20250213_134700738.jpg",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "Every ordinary day becomes extraordinary with you ✨",
    "tag": "Special Outing 🍷"
  },
  {
    "id": 49,
    "filename": "Screenshot_20250213-233431.png",
    "type": "image",
    "dateStr": "2025-02-12",
    "dateFormatted": "February 13, 2025",
    "timestamp": 1739376000000,
    "caption": "I remember laughing so hard right around this time 😂💕",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 50,
    "filename": "VID-20250224-WA0003.mp4",
    "type": "video",
    "dateStr": "2025-02-23",
    "dateFormatted": "February 24, 2025",
    "timestamp": 1740326400000,
    "caption": "Holding your hand here felt like coming home 🏡❤️",
    "tag": "Precious Clip 📹"
  },
  {
    "id": 51,
    "filename": "VID-20250224-WA0005.mp4",
    "type": "video",
    "dateStr": "2025-02-23",
    "dateFormatted": "February 24, 2025",
    "timestamp": 1740326400000,
    "caption": "Captured a moment of magic that I will treasure forever 🌟",
    "tag": "Live Moment 📽️"
  },
  {
    "id": 52,
    "filename": "VID-20250224-WA0007.mp4",
    "type": "video",
    "dateStr": "2025-02-23",
    "dateFormatted": "February 24, 2025",
    "timestamp": 1740326400000,
    "caption": "My heart is so full every single time I see your cute face 🥰",
    "tag": "Laughs in Motion 🍿"
  },
  {
    "id": 53,
    "filename": "IMG-20250405-WA0008.jpg",
    "type": "image",
    "dateStr": "2025-04-04",
    "dateFormatted": "April 5, 2025",
    "timestamp": 1743782400000,
    "caption": "Unfiltered, unscripted, pure love in one frame 📸❤️",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 54,
    "filename": "IMG-20250408-WA0001.jpg",
    "type": "image",
    "dateStr": "2025-04-07",
    "dateFormatted": "April 8, 2025",
    "timestamp": 1744041600000,
    "caption": "You make every place we go feel like paradise 🌺",
    "tag": "Together Always 🌸"
  },
  {
    "id": 55,
    "filename": "IMG-20250408-WA0002(1).jpg",
    "type": "image",
    "dateStr": "2025-04-07",
    "dateFormatted": "April 8, 2025",
    "timestamp": 1744041600000,
    "caption": "The girl who makes my world spin in the best way possible 💫",
    "tag": "Sweet Smiles 😊"
  },
  {
    "id": 56,
    "filename": "IMG-20250408-WA0002.jpg",
    "type": "image",
    "dateStr": "2025-04-07",
    "dateFormatted": "April 8, 2025",
    "timestamp": 1744041600000,
    "caption": "Soft laughter, warm hugs, and sweet memories with you ☕💖",
    "tag": "Golden Hour 🌅"
  },
  {
    "id": 57,
    "filename": "IMG-20250410-WA0004.jpeg",
    "type": "image",
    "dateStr": "2025-04-09",
    "dateFormatted": "April 10, 2025",
    "timestamp": 1744214400000,
    "caption": "Forever grateful for this day and for having you in my life 🙏❤️",
    "tag": "Special Outing 🍷"
  },
  {
    "id": 58,
    "filename": "Screenshot_20250410-124123.png",
    "type": "image",
    "dateStr": "2025-04-09",
    "dateFormatted": "April 10, 2025",
    "timestamp": 1744214400000,
    "caption": "A priceless moment I wish I could replay over and over 🎞️💕",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 59,
    "filename": "IMG-20250412-WA0012.jpg",
    "type": "image",
    "dateStr": "2025-04-11",
    "dateFormatted": "April 12, 2025",
    "timestamp": 1744387200000,
    "caption": "Your happiness is my absolute favorite thing in the universe 🌌",
    "tag": "Cozy Days ☕"
  },
  {
    "id": 60,
    "filename": "IMG-20250412-WA0013.jpg",
    "type": "image",
    "dateStr": "2025-04-11",
    "dateFormatted": "April 12, 2025",
    "timestamp": 1744387200000,
    "caption": "Looking forward to creating a million more memories like this ✨",
    "tag": "Unfiltered Joy ✨"
  },
  {
    "id": 61,
    "filename": "IMG-20250412-WA0014.jpg",
    "type": "image",
    "dateStr": "2025-04-11",
    "dateFormatted": "April 12, 2025",
    "timestamp": 1744387200000,
    "caption": "Your smile in this moment made my whole day brighter ✨",
    "tag": "Best Memories 💫"
  },
  {
    "id": 62,
    "filename": "IMG-20250412-WA0015.jpg",
    "type": "image",
    "dateStr": "2025-04-11",
    "dateFormatted": "April 12, 2025",
    "timestamp": 1744387200000,
    "caption": "A little slice of pure happiness captured forever ❤️",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 63,
    "filename": "IMG-20250413-WA0002.jpg",
    "type": "image",
    "dateStr": "2025-04-12",
    "dateFormatted": "April 13, 2025",
    "timestamp": 1744473600000,
    "caption": "Looking at this brings back every butterfly I felt that day 🦋",
    "tag": "Together Always 🌸"
  },
  {
    "id": 64,
    "filename": "IMG-20250413-WA0003.jpg",
    "type": "image",
    "dateStr": "2025-04-12",
    "dateFormatted": "April 13, 2025",
    "timestamp": 1744473600000,
    "caption": "One of my absolute favorite memories with you 💖",
    "tag": "Sweet Smiles 😊"
  },
  {
    "id": 65,
    "filename": "VID-20250425-WA0011(1).mp4",
    "type": "video",
    "dateStr": "2025-04-24",
    "dateFormatted": "April 25, 2025",
    "timestamp": 1745510400000,
    "caption": "No matter how many times I look at this, my heart skips a beat 😊",
    "tag": "Video Memories 🎬"
  },
  {
    "id": 66,
    "filename": "VID-20250425-WA0011.mp4",
    "type": "video",
    "dateStr": "2025-04-24",
    "dateFormatted": "April 25, 2025",
    "timestamp": 1745510400000,
    "caption": "Proof that the best moments in life are spent by your side 🌅",
    "tag": "Precious Clip 📹"
  },
  {
    "id": 67,
    "filename": "IMG-20250426-WA0000.jpg",
    "type": "image",
    "dateStr": "2025-04-25",
    "dateFormatted": "April 26, 2025",
    "timestamp": 1745596800000,
    "caption": "You, being effortlessly stunning as always 🥰",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 68,
    "filename": "IMG-20250426-WA0001.jpg",
    "type": "image",
    "dateStr": "2025-04-25",
    "dateFormatted": "April 26, 2025",
    "timestamp": 1745596800000,
    "caption": "Every ordinary day becomes extraordinary with you ✨",
    "tag": "Cozy Days ☕"
  },
  {
    "id": 69,
    "filename": "WhatsApp Video 2025-05-19 at 20.32.49_d17b42e3.mp4",
    "type": "video",
    "dateStr": "2025-05-18",
    "dateFormatted": "May 19, 2025",
    "timestamp": 1747584000000,
    "caption": "I remember laughing so hard right around this time 😂💕",
    "tag": "Video Memories 🎬"
  },
  {
    "id": 70,
    "filename": "IMG-20250608-WA0001(1).jpg",
    "type": "image",
    "dateStr": "2025-06-07",
    "dateFormatted": "June 8, 2025",
    "timestamp": 1749312000000,
    "caption": "Holding your hand here felt like coming home 🏡❤️",
    "tag": "Best Memories 💫"
  },
  {
    "id": 71,
    "filename": "IMG-20250608-WA0001.jpg",
    "type": "image",
    "dateStr": "2025-06-07",
    "dateFormatted": "June 8, 2025",
    "timestamp": 1749312000000,
    "caption": "Captured a moment of magic that I will treasure forever 🌟",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 72,
    "filename": "IMG-20250608-WA0006.jpg",
    "type": "image",
    "dateStr": "2025-06-07",
    "dateFormatted": "June 8, 2025",
    "timestamp": 1749312000000,
    "caption": "My heart is so full every single time I see your cute face 🥰",
    "tag": "Together Always 🌸"
  },
  {
    "id": 73,
    "filename": "Screenshot_20250608-234731.png",
    "type": "image",
    "dateStr": "2025-06-07",
    "dateFormatted": "June 8, 2025",
    "timestamp": 1749312000000,
    "caption": "Unfiltered, unscripted, pure love in one frame 📸❤️",
    "tag": "Sweet Smiles 😊"
  },
  {
    "id": 74,
    "filename": "Screenshot_20250608-235301.png",
    "type": "image",
    "dateStr": "2025-06-07",
    "dateFormatted": "June 8, 2025",
    "timestamp": 1749312000000,
    "caption": "You make every place we go feel like paradise 🌺",
    "tag": "Golden Hour 🌅"
  },
  {
    "id": 75,
    "filename": "VID-20250611-WA0000.mp4",
    "type": "video",
    "dateStr": "2025-06-10",
    "dateFormatted": "June 11, 2025",
    "timestamp": 1749571200000,
    "caption": "The girl who makes my world spin in the best way possible 💫",
    "tag": "Live Moment 📽️"
  },
  {
    "id": 76,
    "filename": "FB_IMG_1756179594696.jpg",
    "type": "image",
    "dateStr": "2025-08-26",
    "dateFormatted": "August 26, 2025",
    "timestamp": 1756179594696,
    "caption": "Soft laughter, warm hugs, and sweet memories with you ☕💖",
    "tag": "Warm Hugs 💖"
  },
  {
    "id": 77,
    "filename": "IMG-20251010-WA0005.jpg",
    "type": "image",
    "dateStr": "2025-10-09",
    "dateFormatted": "October 10, 2025",
    "timestamp": 1760025600000,
    "caption": "Forever grateful for this day and for having you in my life 🙏❤️",
    "tag": "Cozy Days ☕"
  },
  {
    "id": 78,
    "filename": "IMG-20251010-WA0006.jpg",
    "type": "image",
    "dateStr": "2025-10-09",
    "dateFormatted": "October 10, 2025",
    "timestamp": 1760025600000,
    "caption": "A priceless moment I wish I could replay over and over 🎞️💕",
    "tag": "Unfiltered Joy ✨"
  },
  {
    "id": 79,
    "filename": "IMG-20251010-WA0009.jpg",
    "type": "image",
    "dateStr": "2025-10-09",
    "dateFormatted": "October 10, 2025",
    "timestamp": 1760025600000,
    "caption": "Your happiness is my absolute favorite thing in the universe 🌌",
    "tag": "Best Memories 💫"
  },
  {
    "id": 80,
    "filename": "IMG-20251010-WA0011.jpg",
    "type": "image",
    "dateStr": "2025-10-09",
    "dateFormatted": "October 10, 2025",
    "timestamp": 1760025600000,
    "caption": "Looking forward to creating a million more memories like this ✨",
    "tag": "Love & Laughter 💕"
  },
  {
    "id": 81,
    "filename": "Messenger_creation_0968fec8-8000-4b30-a108-83fa81954c3e.jpeg",
    "type": "image",
    "dateStr": "2026-08-21",
    "dateFormatted": "August 21, 2026",
    "timestamp": 1787305438321,
    "caption": "Your smile in this moment made my whole day brighter ✨",
    "tag": "Together Always 🌸"
  }
];

export const memories = rawMemoriesData.map(item => {
  // Find URL key in glob
  const matchingKey = Object.keys(mediaGlob).find(key => key.endsWith('/' + item.filename));
  const url = matchingKey ? mediaGlob[matchingKey] : '';

  return {
    ...item,
    url,
    localUrl: url,
    fallbackUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80'
  };
});

// Key milestones grouped by date range for the timeline
export const timelineMilestones = [
  {
    id: 1,
    date: "August 21, 2024",
    title: "Where Our Album Begins",
    description: "The earliest captured memory in our journey together. Looking back at where it all started brings back every warm feeling.",
    filename: "IMG-20240821-WA0006(1).jpg",
    tag: "First Snapshots 📸"
  },
  {
    id: 2,
    date: "October 4, 2024",
    title: "Fall Adventures & Late Night Laughs",
    description: "Crisp autumn days, spontaneous trips, and discovering how much joy we bring into each other's lives.",
    filename: "IMG-20241004-WA0000.jpg",
    tag: "Autumn Magic 🍂"
  },
  {
    id: 3,
    date: "December 7, 2024",
    title: "Cozy Holiday Warmth",
    description: "Sharing hot drinks, soft sweaters, and realizing that home is simply wherever you are.",
    filename: "IMG-20241207-WA0001.jpg",
    tag: "Winter Warmth ❄️"
  },
  {
    id: 4,
    date: "February 13, 2025",
    title: "Valentine Season & Sweet Surprises",
    description: "Celebrating love, making silly video clips, and holding each other tight through every season.",
    filename: "Screenshot_20250213-233431.png",
    tag: "Heartstrings 💖"
  },
  {
    id: 5,
    date: "April 25, 2025",
    title: "Spring Blossoms & Sunlit Days",
    description: "Sunlight hitting your smile, taking road trips, and building memories that will last a lifetime.",
    filename: "VID-20250425-WA0011(1).mp4",
    tag: "Sunlight & Joy 🌸"
  },
  {
    id: 6,
    date: "August 21, 2026",
    title: "Every Single Day With You",
    description: "Through 80+ captured moments and endless unwritten ones, you remain my favorite story, my home, and my forever person.",
    filename: "Messenger_creation_0968fec8-8000-4b30-a108-83fa81954c3e.jpeg",
    tag: "Forever & Always 💞"
  }
].map(m => {
  const item = memories.find(i => i.filename === m.filename) || memories[0];
  return {
    ...m,
    image: item ? item.url : '',
    type: item ? item.type : 'image'
  };
});
