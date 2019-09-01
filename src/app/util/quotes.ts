export class Quotes {
    private static quotes = [
        "\"The way get started is to quit talking and begin doing.\" - Walt Disney",
        "\"The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.\" - Winston Churchill",
        "\"Don't let yesterday take up too much of today.\" - Will Rogers",
        "\"You learn more from failure than from success. Don't let it stop you. Failure builds character.\" - Unknown",
        "\"It's not whether you get knocked down, it's whether you get up.\" - Inspirational Quote by Vince Lombardi",
        "\"If you are working on something that you really care about, you don't have to be pushed. The vision pulls you.\" - Steve Jobs",
        "\"People who are crazy enough to think they can change the world, are the ones who do.\" - Rob Siltanen",
        "\"Failure will never overtake me if my determination to succeed is strong enough.\" - Og Mandino",
        "\"Entrepreneurs are great at dealing with uncertainty and also very good at minimizing risk. That's the classic entrepreneur.\" - Mohnish Pabrai",
        "\"We may encounter many defeats but we must not be defeated.\" - Maya Angelou",
        "\"Knowing is not enough; we must apply. Wishing is not enough; we must do.\" - Johann Wolfgang Von Goethe",
        "\"Imagine your life is perfect in every respect; what would it look like?\" - Brian Tracy",
        "\"We generate fears while we sit. We overcome them by action.\" - Dr. Henry Link",
        "\"Whether you think you can or think you can't, you're right.\" - Henry Ford",
        "\"Security is mostly a superstition. Life is either a daring adventure or nothing.\" - Helen Keller",
        "\"The man who has confidence in himself gains the confidence of others.\" - Hasidic Proverb",
        "\"The only limit to our realization of tomorrow will be our doubts of today.\" - Franklin D. Roosevelt",
        "\"Creativity is intelligence having fun.\" - Albert Einstein",
        "\"What you lack in talent can be made up with desire, hustle and giving 110% all the time.\" - Don Zimmer",
        "\"Do what you can with all you have, wherever you are.\" - Theodore Roosevelt",
        "\"Develop an 'Attitude of Gratitude'. Say thank you to everyone you meet for everything they do for you.\" - Brian Tracy",
        "\"You are never too old to set another goal or to dream a new dream.\" - C.S. Lewis",
        "\"To see what is right and not do it is a lack of courage.\" - Confucius",
        "\"Reading is to the mind, as exercise is to the body.\" - Brian Tracy",
        "\"The future belongs to the competent. Get good, get better, be the best!\" - Success Quote by Brian Tracy",
        "\"For every reason it's not possible, there are hundreds of people who have faced the same circumstances and succeeded.\" - Jack Canfield",
        "\"Things work out best for those who make the best of how things work out.\" - Positive Quote by John Wooden",
        "\"A room without books is like a body without a soul.\" - Marcus Tullius Cicero",
        "\"I think goals should never be easy, they should force you to work, even if they are uncomfortable at the time.\" - Michael Phelps",
        "\"One of the lessons that I grew up with was to always stay true to yourself and never let what somebody else says distract you from your goals.\" - Michelle Obama",
        "\"Today's accomplishments were yesterday's impossibilities.\" - Robert H. Schuller",
        "\"The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.\" - Steve Jobs",
        "\"You don't have to be great to start, but you have to start to be great.\" - Zig Ziglar",
        "\"A clear vision, backed by definite plans, gives you a tremendous feeling of confidence and personal power.\" - Brian Tracy",
        "\"There are no limits to what you can accomplish, except the limits you place on your own thinking.\" - Brian Tracy"
    ]

    public static getQuote(): string {
        return this.quotes[this.randomIntFromInterval(0, this.quotes.length)];
    }

    static randomIntFromInterval(min, max) { // [min, max)
        return Math.floor(Math.random() * (max - min) + min);
    }


}