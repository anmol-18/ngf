// ═══════════════════════════════════════════════════════════════
// CUSTOMIZATION — edit these values to personalize the experience
// ═══════════════════════════════════════════════════════════════

// TODO: Replace with her actual name (fun gate only, not real security)
export const CORRECT_NAME = 'Isha';

// export const LUCKY_CARD_REWARDS = [
//   { emoji: '💋', title: '100 Kisses Coupon', desc: 'Redeem anytime, no expiration.' },
//   { emoji: '🍕', title: 'Date Night of Your Choice', desc: 'Your pick — I\'m buying.' },
//   { emoji: '🎬', title: 'Movie Marathon', desc: 'Blankets, snacks, and your favorites.' },
//   { emoji: '🧸', title: 'Unlimited Hugs, 6ft Teddy Bear', desc: 'No limits. Seriously.' },
//   { emoji: '👑', title: 'Princess for a Day, I cant say no to anything', desc: 'Royal treatment, all day long.' },
//   { emoji: '❤️', title: 'You won... Me forever', desc: 'The best prize of all.' },
// ];
export const LUCKY_CARD_REWARDS = [
  {
    emoji: "👜",
    title: "A New Handbag (15k)",
    desc: "Let's find one you'll absolutely fall in love with."
  },
  {
    emoji: "👗",
    title: "Shopping Spree(10k)",
    desc: "Pick the dresses or outfits you've been eyeing."
  },
  {
    emoji: "✨",
    title: "Jewellery Surprise(15k)",
    desc: "A beautiful piece chosen especially for you."
  },
  {
    emoji: "🥻",
    title: "Patola / Ethnic Outfit (mulmul)",
    desc: "The elegant ethnic look you've always wanted."
  },
  {
    emoji: "👠",
    title: "Fashion Accessories",
    desc: "Shoes, watch, sunglasses or anything you love."
  },
  {
    emoji: "✈️",
    title: "A Trip Together",
    desc: "You choose the destination, I'll plan the memories."
  }
];

export const FIND_HEART_MISS_MESSAGES = [
  'Still looking, beautiful.',
  'Almost there cutu😘',
  "You're stealing all my hearts.❤️",
  'Keep going, sexy!',
  'Not this one Maharani Sahiba',
  'Not that one — but strawberry!',
];

// Shown under photo1 in Find My Heart (same slide, not a separate slide)
export const FIND_HEART_LETTER = `Every time I look at you, my heart does a little happy dance.
You are the most beautiful surprise life ever gave me.
Thank you for choosing me.`;

// Shown under photo2 in Find My Heart
export const PHOTO2_MESSAGE = 'You are my love of my life';

// Shown with couple photo on the closing screen
export const COUPLE_PHOTO_MESSAGE =
  'Will you be my girlfriend again, I want to date you forever and ever and ever';

export const FIND_HEART_COUPON = {
  emoji: '💌',
  title: 'One Day of me saying yes to anything you want',
  desc: 'Valid for one day claim soon!',
};


export const SCRATCH_CARD_TEXTS = [
  "One day trip to Neemrana Fort for staycation.",
  'One day trip to Neemrana Fort for staycation and Full body massage by me❤️❤️❤️!!!!!',
];

export const SLOT_MACHINE_REWARD = {
  emoji: '❤️',
  title: "Today's Surprise Unlocked",
  desc: 'A fancy date in your city soon!',
};

export const WHEEL_SEGMENTS = [
  { label: 'Romantic Date', emoji: '❤️', color: '#ffb3c6' },
  { label: 'Proposal Date', emoji: '🍕', color: '#ffd1dc' },
  { label: 'Movie Date', emoji: '🎬', color: '#e8d5f2' },
  { label: 'Cafe Hopping Date', emoji: '🛍', color: '#f5d78e' },
  { label: 'Arcade Date', emoji: '💌', color: '#ffe4ec' },
  { label: 'Long Drive Date', emoji: '🧸', color: '#ffc8dd' },
  { label: 'Mandir Date', emoji: '🌹', color: '#e8a0bf' },
];

// TODO: Personalize the final typewriter letter
export const FINAL_GIFT_LETTER =
  'Thank you for being the most beautiful part of my life. Every day with you feels like winning every game in the world. Happy National Girlfriend Day ❤️';

export const FINAL_SURPRISE_TEXT = 'You won... Me. Forever.';

// TODO: Your closing message
export const CLOSING_MESSAGE =
  'My lovely most beautiful girl ISHU, I love you more than words can say. Happy National Girlfriend Day! 💗';

export const ASSETS = {
  couplePhoto: '/assets/couple-photo.jpeg',
  photo1: '/assets/photo1.jpeg',
  // TODO: Add photo2.jpeg to /public/assets/
  photo2: '/assets/photo2.jpeg',
  messageVideo: '/assets/message.mp4',
  revealChime: '/assets/sfx/reveal-chime.mp3',
  bgMusic: '/assets/bg-music.mp3',
  voiceNote: '/assets/voice-note.mp3',
};
