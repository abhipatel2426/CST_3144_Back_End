const lessons = [
    {
        "id": 1,
        "subject": "Math",
        "Location": "London",
        "Price": 100,
        "image": "images/math.webp",
        "Space": 5
    },
    {
        "id": 2,
        "subject": "Science",
        "Location": "New York",
        "Price": 120,
        "image": "images/science.png",
        "Space": 15
    },
    {
        "id": 3,
        "subject": "Music",
        "Location": "London",
        "Price": 140,
        "image": "images/music.png",
        "Space": 4
    },
    {
        "id": 4,
        "subject": "English",
        "Location": "London",
        "Price": 300,
        "image": "images/english.png",
        "Space": 5
    },
    {
        "id": 5,
        "subject": "Sport",
        "Location": "Mehasana",
        "Price": 400,
        "image": "images/sport.png",
        "Space": 5
    },
    {
        "id": 6,
        "subject": "Programming",
        "Location": "New York",
        "Price": 250,
        "image": "images/sport.png",
        "Space": 10
    },
    {
        "id": 7,
        "subject": "History",
        "Location": "Paris",
        "Price": 180,
        "image": "images/english.png",
        "Space": 8
    }
];
// Export for server use

   // Export for server use only
if (typeof module !== 'undefined' && module.exports) {
    module.exports = lessons;
}