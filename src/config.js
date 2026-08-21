/**
 * ROMANTIC SURPRISE CONFIGURATION FILE
 * Edit any of the values below to personalize the surprise website!
 */

import { memories, timelineMilestones } from './utils/memoriesData';
import { localPlaylist } from './utils/soundsData';

export const config = {
  // 1. UNLOCK SCREEN GATE
  unlock: {
    question: "Where did we have our first date?",
    // Acceptable answers (case-insensitive & whitespace trimmed)
    answers: ["starbucks", "starbucks coffee", "coffee shop", "central cafe"],
    hint: "Think back to that cozy winter evening where we talked for hours...",
    shakeDuration: 600, // ms
  },

  // 2. OPENING HERO SCREEN
  opening: {
    typewriterLines: [
      "I know things have been hard lately...",
      "But every single moment with you is my favorite chapter in life.",
      "I built this special place just for you ❤️"
    ],
    scrollPromptText: "Scroll down to travel through our story",
  },

  // 3. BACKGROUND MUSIC PLAYLIST (Local MP3 assets from assets/sounds)
  music: {
    playlist: localPlaylist
  },

  // 3.5 RELATIONSHIP COUNT-UP TIMER
  timer: {
    startDate: "2020-11-26T00:00:00",
    heading: "Time Spent With You",
    subheading: "I know things have been hard lately... but every single moment with you is my favorite chapter in life.",
    badge: "Time Spent With You"
  },

  // 3.6 SEALED LOVE LETTER
  loveLetter: {
    envelopeTitle: "A Secret Letter For You",
    envelopeSub: "Tap the wax seal to unfold my heart",
    receiver: "My Dearest,",
    paragraphs: [
      "I built this special surprise space for you because words alone could never fully capture how deeply you mean to me.",
      "Looking back through all 80+ photos and videos we've taken together, I am reminded of how much warmth, laughter, and light you bring into my life every single day. From our quiet coffee dates to spontaneous late-night adventures, every second by your side is my favorite memory.",
      "I know we've faced challenging moments recently, but my love for you has only grown stronger. I promise to always listen to you with patience, protect your happiness, and hold your hand through whatever comes our way.",
      "Thank you for being my best friend, my safe space, and my favorite person in the entire world."
    ],
    closing: "Forever & Always Yours,",
    senderName: "With All My Love ❤️"
  },

  // 4. RELATIONSHIP TIMELINE
  timeline: {
    heading: "Our Journey Together",
    subheading: "A timeline of real moments & milestones that built our world",
    events: timelineMilestones,
    // The specific, honest apology line at the end of the timeline
    apologyLine: {
      title: "An Honest Promise From My Heart",
      text: "Looking back, I know things have been hard recently and I haven't always handled stress perfectly. When I got overwhelmed last month and became distant, I made you feel unheard. I am truly sorry for that. I promise to listen with an open heart, protect your joy, and be there fully for you every single day."
    }
  },

  // 5. PHOTO & VIDEO GALLERY (Personalized real assets with metadata event dates)
  gallery: {
    heading: "Snapshots & Memories of Us",
    subheading: `${memories.length} real memories (70 photos & 11 video clips) with event dates`,
    items: memories
  },

  // 6. "THINGS I LOVE ABOUT YOU" RANDOMIZER (20 ITEMS)
  loveList: [
    "The way your eyes crinkle at the corners when you laugh genuinely",
    "How you always remember how I take my morning coffee",
    "Your endless kindness towards animals and everyone around you",
    "The soft scrunched face you make when you're super focused",
    "How you make even the most boring errands feel like an adventure",
    "Your warm hugs after a long, exhausting day",
    "The way you sing along passionately (even when you don't know the lyrics)",
    "Your incredible strength and grace, even through tough moments",
    "How cozy and safe it feels when I sleep next to you",
    "Your cute sleepy morning voice",
    "How passionately you talk about the things you care about",
    "The way you steal the blankets and roll yourself like a burrito",
    "Your random text messages during the day just checking in",
    "How your hand fits so perfectly into mine",
    "Your contagious laugh that brightens up any room instantly",
    "The way you look at me when you think I'm not paying attention",
    "How patient you are with me when I get stubborn",
    "Your adorable dance moves when your favorite food arrives",
    "The way you make me want to be a better person every day",
    "Simply the fact that you exist and chose to share your life with me ❤️"
  ],

  // 7. BUILD-UP SECTION
  buildUp: {
    line1: "Before we reach the next chapter...",
    line2: "Take a deep breath.",
    line3: "I want to ask you something from the very bottom of my heart.",
  },

  // 8. THE PROPOSAL SCREEN
  proposal: {
    question: "Will you be my Valentine... for life?",
    yesButtonText: "Yes, forever! 💖",
    dodgeButtonText: "Ask me later 😜",
    dodgeToasts: [
      "Nope, can't touch this! 🏃‍♂️",
      "Too slow! Try the pink button 😉",
      "Nice try! The answer is YES 💕",
      "That button is broken, tap YES! 😘",
      "Are you sure? Re-read the question! ❤️"
    ]
  },

  // 9. WARNING LABEL SCREEN
  warningLabel: {
    title: "⚠️ OFFICIAL LIFE PARTNER WARNING LABEL",
    subTitle: "Please read all side effects before confirming your decision",
    items: [
      "Excessive blanket theft at 3:00 AM 🛌",
      "Singing off-key at 2 AM to 2000s throwbacks 🎤",
      "Unsolicited memes sent at random working hours 📱",
      "Spontaneous forehead kisses & tight bear hugs 🫂",
      "Stealing your French fries while claiming 'I'm not hungry' 🍟",
      "Uncontrollable urge to drag you on spontaneous boba runs 🧋",
      "Lifetime subscription to forehead kisses and warm cuddles 💖"
    ],
    question: "Can you handle me for the long run?",
    confirmButtonText: "Yes, I can handle you! ❤️"
  },

  // 10. CLOSING SCREEN
  closing: {
    headline: "You just made me the happiest person alive! 🎉",
    message: "Thank you for being my rock, my sunshine, and my best friend. Every day with you is a gift I will never take for granted.",
    replyPrompt: "Leave a sweet reply or secret message for me:",
    signature: "Forever & Always Yours,\nWith all my love ❤️"
  }
};
