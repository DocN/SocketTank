class Player {
    constructor(username, userID, playerNumber) {
        this.username = username;
        this.userID = userID;
        this.playerNumber = playerNumber;
    }
    randomID() {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

module.exports = Player