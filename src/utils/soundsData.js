/**
 * Local Sounds Importer
 * Dynamically imports all MP3 audio assets from src/assets/sounds
 */

const soundsGlob = import.meta.glob('/src/assets/sounds/*.mp3', { eager: true, import: 'default' });

export const localPlaylist = [
  {
    id: 1,
    title: "Kesariya",
    movie: "Brahmāstra",
    artist: "Arijit Singh",
    fileKey: "kesariya_arijit_ranbir.mp3",
    officialUrl: "https://www.youtube.com/watch?v=BddP6PYo2Gs",
    vibe: "Warm Bollywood Romance 💖"
  },
  {
    id: 2,
    title: "Tum Hi Ho",
    movie: "Aashiqui 2",
    artist: "Arijit Singh",
    fileKey: "tum_hi_ho.mp3",
    officialUrl: "https://www.youtube.com/watch?v=Umqb9KENgmk",
    vibe: "Soulful Heartbeat 🎹"
  },
  {
    id: 3,
    title: "Raataan Lambiyan",
    movie: "Shershaah",
    artist: "Jubin Nautiyal & Asees Kaur",
    fileKey: "raatan_lambiyaan_instr.mp3",
    officialUrl: "https://www.youtube.com/watch?v=g6fnFALEJpE",
    vibe: "Late-Night Instrumental 🌙"
  },
  {
    id: 4,
    title: "Tujhe Kitna Chahne Lage",
    movie: "Kabir Singh",
    artist: "Arijit Singh",
    fileKey: "tujhe_kitna_chahne.mp3",
    officialUrl: "https://www.youtube.com/watch?v=258Z606mD9g",
    vibe: "Deep Acoustic Melody 🎸"
  },
  {
    id: 5,
    title: "Baby I Love You",
    movie: "Romantic Special",
    artist: "Unplugged Love",
    fileKey: "baby_i_love_u.mp3",
    officialUrl: "https://www.youtube.com/watch?v=BddP6PYo2Gs",
    vibe: "Sweet Love Anthem 💕"
  }
].map((track) => {
  const match = Object.keys(soundsGlob).find((k) => k.endsWith('/' + track.fileKey));
  return {
    ...track,
    audioUrl: match ? soundsGlob[match] : ''
  };
});
