/* =====================================================
   TEAM GIRLS VS TEAM BOYS
   20 HITS TO WIN
   NORMAL HIT = 1
   BRUTALITY = 10
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const setupScreen =
    document.getElementById("setupScreen");

const battleScreen =
    document.getElementById("battleScreen");

const fightButton =
    document.getElementById("fightButton");

const battleArena =
    document.getElementById("battleArena");

const girlsLayer =
    document.getElementById("girlsLayer");

const centerDivider =
    document.getElementById("centerDivider");

const girlsHealth =
    document.getElementById("girlsHealth");

const boysHealth =
    document.getElementById("boysHealth");

const girlsName =
    document.getElementById("girlsName");

const boysName =
    document.getElementById("boysName");

const roundText =
    document.getElementById("roundText");

const hitText =
    document.getElementById("hitText");

const brutalityText =
    document.getElementById("brutalityText");

const winnerText =
    document.getElementById("winnerText");

const particles =
    document.getElementById("particles");

const battleControls =
    document.getElementById("battleControls");

const demoIndicator =
    document.getElementById("demoIndicator");


/* =====================================================
   GAME STATE
===================================================== */

const MAX_HITS = 20;

let girlsHits = 0;

let boysHits = 0;

let round = 1;

let soundEnabled = true;

let gameOver = false;


/* =====================================================
   AUDIO
===================================================== */

function playSound(
    frequency = 200,
    duration = 0.08,
    type = "square"
) {

    if (!soundEnabled)
        return;

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        const audio =
            new AudioContext();

        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();

        oscillator.type = type;

        oscillator.frequency.value =
            frequency;

        gain.gain.setValueAtTime(
            0.05,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + duration
        );

        oscillator.connect(gain);

        gain.connect(audio.destination);

        oscillator.start();

        oscillator.stop(
            audio.currentTime + duration
        );

    } catch (error) {

        console.log(
            "Audio unavailable"
        );

    }

}


/* =====================================================
   START GAME
===================================================== */

fightButton.addEventListener(
    "click",
    () => {

        setupScreen.classList.add(
            "hidden"
        );

        battleScreen.classList.remove(
            "hidden"
        );

        resetGame();

        playSound(
            440,
            .12,
            "triangle"
        );

    }
);


/* =====================================================
   UPDATE BATTLE
===================================================== */

function updateBattle() {

    /*
        Girls progress:

        0 hits =
        center at 50%

        20 girls hits =
        center at 100%

        Girls image therefore
        covers the whole screen.
    */

    const girlsProgress =
        girlsHits / MAX_HITS;

    /*
        Boys progress works
        in the opposite direction.
    */

    const boysProgress =
        boysHits / MAX_HITS;


    /*
        Determine who has
        more hits.
    */

    let dividerPosition = 50;


    if (girlsHits > boysHits) {

        dividerPosition =
            50 + (
                girlsProgress * 50
            );

    }


    if (boysHits > girlsHits) {

        dividerPosition =
            50 - (
                boysProgress * 50
            );

    }


    /*
        Keep the divider
        inside the arena.
    */

    dividerPosition =
        Math.max(
            0,
            Math.min(
                100,
                dividerPosition
            )
        );


    /*
        MOVE CENTER LINE
    */

    centerDivider.style.left =
        dividerPosition + "%";


    /*
        MOVE GIRLS IMAGE MASK

        Girls image is revealed
        from the left.
    */

    girlsLayer.style.clipPath =
        `
        polygon(
            0 0,
            ${dividerPosition}% 0,
            ${dividerPosition}% 100%,
            0 100%
        )
        `;


    /*
        HEALTH BARS

        Health is based on
        hits received.
    */

    const girlsHealthPercent =
        Math.max(
            0,
            100 -
            (
                boysHits /
                MAX_HITS
            ) * 100
        );


    const boysHealthPercent =
        Math.max(
            0,
            100 -
            (
                girlsHits /
                MAX_HITS
            ) * 100
        );


    girlsHealth.style.width =
        girlsHealthPercent + "%";


    boysHealth.style.width =
        boysHealthPercent + "%";


    /*
        ROUND
    */

    roundText.textContent =
        "ROUND " + round;

}


/* =====================================================
   HIT ANIMATION
===================================================== */

function hitAnimation(team) {

    /*
        Screen shake
    */

    battleArena.classList.remove(
        "shake"
    );

    void battleArena.offsetWidth;

    battleArena.classList.add(
        "shake"
    );


    /*
        HIT TEXT
    */

    hitText.style.color =
        team === "girls"
            ? "#f24cff"
            : "#ffb52a";


    hitText.textContent =
        "HIT!";


    hitText.classList.remove(
        "show"
    );

    void hitText.offsetWidth;

    hitText.classList.add(
        "show"
    );


    /*
        Flash particles
    */

    createParticles(
        team === "girls"
            ? "#ed45ff"
            : "#ffb52a",
        18
    );


    /*
        Sound
    */

    if (team === "girls") {

        playSound(
            160,
            .08,
            "square"
        );

    } else {

        playSound(
            260,
            .08,
            "square"
        );

    }

}


/* =====================================================
   BRUTALITY ANIMATION
===================================================== */

function brutalityAnimation(team) {

    /*
        Stronger screen shake
    */

    battleArena.classList.remove(
        "shake"
    );

    void battleArena.offsetWidth;

    battleArena.classList.add(
        "shake"
    );


    /*
        BRUTALITY TEXT
    */

    brutalityText.style.color =
        team === "girls"
            ? "#f04cff"
            : "#ffb329";


    brutalityText.classList.remove(
        "show"
    );

    void brutalityText.offsetWidth;

    brutalityText.classList.add(
        "show"
    );


    /*
        Massive particle burst
    */

    createParticles(
        team === "girls"
            ? "#ef45ff"
            : "#ffb52a",
        60
    );


    /*
        Multiple impact sounds
    */

    playSound(
        80,
        .18,
        "sawtooth"
    );

    setTimeout(
        () => {

            playSound(
                120,
                .15,
                "square"
            );

        },
        100
    );

    setTimeout(
        () => {

            playSound(
                180,
                .15,
                "square"
            );

        },
        220
    );

}


/* =====================================================
   PARTICLES
===================================================== */

function createParticles(
    particleColor,
    amount
) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );


        particle.className =
            "particle";


        particle.style.background =
            particleColor;


        particle.style.left =
            "50%";


        particle.style.top =
            "50%";


        const x =
            (
                Math.random() * 500
                - 250
            ) + "px";


        const y =
            (
                Math.random() * 350
                - 175
            ) + "px";


        particle.style.setProperty(
            "--x",
            x
        );


        particle.style.setProperty(
            "--y",
            y
        );


        particles.appendChild(
            particle
        );


        setTimeout(
            () => {

                particle.remove();

            },
            700
        );

    }

}


/* =====================================================
   NORMAL HIT
===================================================== */

function normalHit(team) {

    if (gameOver)
        return;


    /*
        GIRLS ATTACK
    */

    if (team === "girls") {

        girlsHits++;

        hitAnimation(
            "girls"
        );

    }


    /*
        BOYS ATTACK
    */

    if (team === "boys") {

        boysHits++;

        hitAnimation(
            "boys"
        );

    }


    updateBattle();


    /*
        CHECK WINNER
    */

    checkWinner();

}


/* =====================================================
   BRUTALITY
===================================================== */

function brutality(team) {

    if (gameOver)
        return;


    /*
        BRUTALITY = 10 HITS
    */

    if (team === "girls") {

        girlsHits =
            Math.min(
                MAX_HITS,
                girlsHits + 10
            );

    }


    if (team === "boys") {

        boysHits =
            Math.min(
                MAX_HITS,
                boysHits + 10
            );

    }


    brutalityAnimation(
        team
    );


    updateBattle();


    /*
        CHECK WINNER
    */

    checkWinner();

}


/* =====================================================
   WINNER
===================================================== */

function checkWinner() {

    if (
        girlsHits >= MAX_HITS
    ) {

        gameOver = true;

        showWinner(
            "GIRLS WIN!",
            "#f04cff"
        );

        return;

    }


    if (
        boysHits >= MAX_HITS
    ) {

        gameOver = true;

        showWinner(
            "BOYS WIN!",
            "#ffb329"
        );

    }

}


/* =====================================================
   SHOW WINNER
===================================================== */

function showWinner(
    message,
    color
) {

    winnerText.textContent =
        message;

    winnerText.style.color =
        color;

    winnerText.classList.remove(
        "show"
    );

    void winnerText.offsetWidth;

    winnerText.classList.add(
        "show"
    );


    /*
        Big winner sound
    */

    playSound(
        90,
        .25,
        "sawtooth"
    );


    setTimeout(
        () => {

            playSound(
                220,
                .35,
                "triangle"
            );

        },
        180
    );


    /*
        Extra particles
    */

    createParticles(
        color,
        80
    );

}


/* =====================================================
   BUTTONS
===================================================== */

const battleButtons =
    document.querySelectorAll(
        ".battle-button"
    );


battleButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.dataset.action;


                if (
                    action ===
                    "girls-hit"
                ) {

                    normalHit(
                        "girls"
                    );

                }


                if (
                    action ===
                    "boys-hit"
                ) {

                    normalHit(
                        "boys"
                    );

                }


                if (
                    action ===
                    "girls-brutality"
                ) {

                    brutality(
                        "girls"
                    );

                }


                if (
                    action ===
                    "boys-brutality"
                ) {

                    brutality(
                        "boys"
                    );

                }

            }
        );

    }
);


/* =====================================================
   RESET
===================================================== */

function resetGame() {

    girlsHits = 0;

    boysHits = 0;

    round = 1;

    gameOver = false;

    girlsLayer.style.clipPath =
        `
        polygon(
            0 0,
            50% 0,
            50% 100%,
            0 100%
        )
        `;

    centerDivider.style.left =
        "50%";


    girlsHealth.style.width =
        "100%";


    boysHealth.style.width =
        "100%";


    roundText.textContent =
        "ROUND 1";


    winnerText.classList.remove(
        "show"
    );


    brutalityText.classList.remove(
        "show"
    );


    hitText.classList.remove(
        "show"
    );

}


/* =====================================================
   RESTART BUTTON
===================================================== */

document
    .getElementById(
        "restartButton"
    )
    .addEventListener(
        "click",
        resetGame
    );


/* =====================================================
   FULLSCREEN
===================================================== */

document
    .getElementById(
        "fullscreenButton"
    )
    .addEventListener(
        "click",
        async () => {

            try {

                if (
                    !document.fullscreenElement
                ) {

                    await battleArena.requestFullscreen();

                } else {

                    await document.exitFullscreen();

                }

            } catch (error) {

                console.log(
                    "Fullscreen unavailable"
                );

            }

        }
    );


/* =====================================================
   HIDDEN SETTINGS
===================================================== */

const settingsPanel =
    document.getElementById(
        "settingsPanel"
    );


const secretSettings =
    document.getElementById(
        "secretSettings"
    );


let secretClicks = 0;

let secretTimer;


/*
    NO VISIBLE GEAR.

    Tap the bottom-right
    corner three times.
*/

secretSettings.addEventListener(
    "click",
    () => {

        secretClicks++;

        clearTimeout(
            secretTimer
        );


        secretTimer =
            setTimeout(
                () => {

                    secretClicks = 0;

                },
                900
            );


        if (
            secretClicks >= 3
        ) {

            secretClicks = 0;

            settingsPanel.classList.add(
                "open"
            );

        }

    }
);


/* CLOSE SETTINGS */

document
    .getElementById(
        "closeSettings"
    )
    .addEventListener(
        "click",
        () => {

            settingsPanel.classList.remove(
                "open"
            );

        }
    );


/* =====================================================
   SETTINGS
===================================================== */

const girlsNameInput =
    document.getElementById(
        "girlsNameInput"
    );


const boysNameInput =
    document.getElementById(
        "boysNameInput"
    );


girlsNameInput.addEventListener(
    "input",
    () => {

        girlsName.textContent =
            girlsNameInput.value
                .toUpperCase() ||
            "MILEENA";

    }
);


boysNameInput.addEventListener(
    "input",
    () => {

        boysName.textContent =
            boysNameInput.value
                .toUpperCase() ||
            "SCORPION";

    }
);


/* SOUND */

document
    .getElementById(
        "soundToggle"
    )
    .addEventListener(
        "change",
        event => {

            soundEnabled =
                event.target.checked;

        }
    );


/* CONTROLS */

document
    .getElementById(
        "controlsToggle"
    )
    .addEventListener(
        "change",
        event => {

            battleControls.style.display =
                event.target.checked
                    ? "grid"
                    : "none";

        }
    );


/* DEMO */

document
    .getElementById(
        "demoToggle"
    )
    .addEventListener(
        "change",
        event => {

            demoIndicator.style.display =
                event.target.checked
                    ? "block"
                    : "none";

        }
    );


/* =====================================================
   RESET SETTINGS
===================================================== */

document
    .getElementById(
        "resetButton"
    )
    .addEventListener(
        "click",
        () => {

            girlsNameInput.value =
                "MILEENA";

            boysNameInput.value =
                "SCORPION";


            girlsName.textContent =
                "MILEENA";

            boysName.textContent =
                "SCORPION";


            soundEnabled = true;


            document
                .getElementById(
                    "soundToggle"
                )
                .checked = true;


            document
                .getElementById(
                    "controlsToggle"
                )
                .checked = true;


            document
                .getElementById(
                    "demoToggle"
                )
                .checked = true;


            battleControls.style.display =
                "grid";


            demoIndicator.style.display =
                "block";


            resetGame();

        }
    );


/* =====================================================
   BACK TO SETUP
===================================================== */

document
    .getElementById(
        "backButton"
    )
    .addEventListener(
        "click",
        () => {

            settingsPanel.classList.remove(
                "open"
            );

            battleScreen.classList.add(
                "hidden"
            );

            setupScreen.classList.remove(
                "hidden"
            );

        }
    );


/* =====================================================
   KEYBOARD SECRET
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key.toLowerCase() ===
            "s"
        ) {

            settingsPanel.classList.add(
                "open"
            );

        }


        if (
            event.key ===
            "Escape"
        ) {

            settingsPanel.classList.remove(
                "open"
            );

        }

    }
);


/* =====================================================
   INITIAL STATE
===================================================== */

resetGame();
