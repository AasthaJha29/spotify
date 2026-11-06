// console.log("hi")


// async function getsongs() {
//     let a= await fetch("http://127.0.0.1:5500/spotify/songs/")
//     let response=await a.text()
//     let newarray=response.split("\n")
//     let songs=newarray.filter(item=>item.includes(".mp3"))
//     // Remove timestamps (if they exist)
//     songs=songs.map(song=>song.split(/d{8,}/)[0].trim())
    
//     return songs
// }

// async function main() {
//     //fetch song
//     let songs=await getsongs()
//     console.log(songs)
//     //play first song
//     var audio=new Audio(songs[0])
//     audio.play()
// }
// main()

// async function getsongs() {
//     let a = await fetch("http://127.0.0.1:5500/spotify/songs/");
//     let response = await a.text();

//     // Create a temporary HTML parser to extract song filenames
//     let tempDiv = document.createElement("div");
//     tempDiv.innerHTML = response;

//     // Extract filenames from links inside <li> elements
//     let songs = [...tempDiv.querySelectorAll("a")]
//         .map(link => link.getAttribute("href"))
//         .filter(href => href && href.endsWith(".mp3")) // Keep only .mp3 files
//         .map(href => decodeURIComponent(href.replace("/spotify/songs/", ""))); // Extract filename only

//     console.log("Songs list:", songs); // Debugging output
//     return songs;
// }

// async function main() {
//     try {
//         let songs = await getsongs();

//         if (songs.length > 0) {
//             let songURL = `http://127.0.0.1:5500/spotify/songs/${songs[0]}`;
//             console.log("Playing:", songURL);

//             var audio = new Audio(songURL);
//             audio.play();
//         } else {
//             console.error("No songs found!");
//         }
//     } catch (error) {
//         console.error("Error fetching or playing song:", error);
//     }
// }

// // Attach event listener to play the song
// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("playButton").addEventListener("click", main);
// });

async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/spotify/songs/");
    let response = await a.text();
    
    // Convert response to an array of lines
    let newarray = response.split("\n");

    // Filter only `.mp3` files
    let songs = newarray
        .filter(item => item.includes(".mp3"))
        .map(song => song.split(/\d{8,}/)[0].trim()); // Remove timestamps

    console.log("Songs List:", songs); // Debugging
    return songs;
}

async function main() {
    let songs = await getsongs(); // Fetch songs
    if (songs.length === 0) {
        console.error("No songs found.");
        return;
    }

    console.log("Playing:", songs[0]);

    var audio = new Audio("http://127.0.0.1:5500/spotify/songs/" + songs[0]);

    audio.play().catch(error => {
        console.error("Error playing audio:", error);
    });
}

// Ensure the button exists before adding an event listener
document.addEventListener("DOMContentLoaded", function () {
    let playButton = document.getElementById("playButton");
    if (playButton) {
        playButton.addEventListener("click", main);
    } else {
        console.error("Play button not found.");
    }
});






