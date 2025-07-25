// game.js

// Ensure all logic runs after DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {

    // Firebase Setup
    const firebaseConfig = {
        apiKey: "AIzaSyBs3gH6MpLbV0DlIag1B0CODKS-kTlOHEk",
        authDomain: "blackwoodmanor-1cde9.firebaseapp.com",
        projectId: "blackwoodmanor-1cde9",
        storageBucket: "blackwoodmanor-1cde9.appspot.com",
        messagingSenderId: "451127821398",
        appId: "1:451127821398:web:33566d0af016124e96a7f7",
        measurementId: "G-DSSF70V9J8"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
// unnecessary comment 
    const gameState = {
        player: null,
        roomId: null,
        playerName: null,
        partnerName: null,
        finished: false,
        started: false, // <-- add this flag
        riddleState: {
            // Study (Detective A - Room 1)
            portrait: {
                question: "The man in the painting is no stranger to codes. Below him, an object stands still — once used to capture time. How many hands does it have?",
                answer: "3",
                hint: "Focus on the object just below the portrait — one hand would be for hours.",
                solved: false
            },
            typewriter: {
                question: "Old keys rattle in silence. The word ‘CODE’ is jammed. Find the sum of their row numbers.",
                answer: "7",
                hint: "It’s a single-digit number that’s the sum of the row positions for the keys C, O, D, and E. Think of a traditional QWERTY layout — top is 1, middle is 2, bottom is 3.",
                solved: false
            },
            cabinet: {
                question: "Inside the Cabinet lies a faded map marked ‘1950’. Which famous war does this year point to?",
                answer: "korean",
                hint: "This battle happened in a country presently extremely popular for pop music. Starts with K, ends with N",
                solved: false
            },
            // Hidden Library (Detective A - Room 2)
            candle: {
                question: "\"I sleep in silence, slender and dry,\nBut strike me once, and flames will fly.\nBorn from friction, short I live—\nA spark, a flare, is all I give.\nWhat am I?\"",
                answer: "match",
                hint: "A tool for lighting the candle. You’re looking for a word, starts with M and number of letters matching the answer for  Detective B's Atom Count Formula riddle answer - 1 letter.",
                solved: false
            },
            bookshelf: {
                question: `Three ancient books sit side-by-side on a dusty shelf:\nOne is titled Alchemy, one is Astrology, and one is Anatomy.\nEach has a different cover: red, green, or black.\nEach is written in a different language: Latin, Greek, or Arabic.\nThe Alchemy book is somewhere to the left of the green book\nThe Latin book is immediately right to the Anatomy book.\n The red book is not written in Arabic.\n- The black book is not next to the Alchemy book.\nThe green and book about structure of the human body is in the middle.\n\nGoal: Determine the correct order (from left to right) of the books by title, cover color, and language.`,
                answer: "alchemy-anatomy-astrology,red-green-black,greek-arabic-latin",
                hint: "Start with what’s fixed. Then think about what can’t be next to what",
                solved: false
            },
            chest: {
                question: "Chest bears a padlock. Underneath it is a carving: ‘XII, IV, IX’. Convert and sum.",
                answer: "25",
                hint: "It’s the sum of three Roman numerals. One rhymes with ‘Fine’. The total is a two-digit number.",
                solved: false
            },
            // Lab (Detective B - Room 1)
            chalkboard: {
                question: "An equation reads: ‘Sun + Moon = ???’. What do many ancient cultures believe is formed when both align?",
                answer: "eclipse",
                hint: "Starts with E, ends with E, and causes shadows during day or night.",
                solved: false
            },
            bloodStainedTable: {
                question: "Three vials lie shattered. One labeled ‘Cu’, one ‘Au’, one ‘Ag’. Which has the highest value? Give the real name, not the symbol",
                answer: "gold",
                hint: "Four-letter word. A metal fit for king's crown.",
                solved: false
            },
            hiddenFormula: {
                question: "The Eternalis formula ends in something explosive. Multiply the atom count of NaCl by H₂O.",
                answer: "6",
                hint: "You’re multiplying the number of atoms in each compound. One has X, the other has Y. What’s X × Y?",
                solved: false
            },
            // Security Room (Detective B - Room 2)
            safe: {
                question: "The safe code lies in the past — passphrase together what your partner revealed in Portrait and Typewriter.",
                answer: "37",
                hint: "Combine the answer of potrait and the answer of typewriter in Drective A's First room into a single passphrase in ascending order. do not sum them. just put together next to each other. Check the chat for the asnwers.",
                solved: false
            },
            monitor: {
                question: "Three security cameras monitor the halls.\nOne glitches every 4 minutes, another every 6 minutes, and the last every 9 minutes.\nAt exactly 10:00 AM, they all glitched at the same time.\n\nAt what time will they next all glitch together?",
                answer: "36",
                hint: "Think of their glitch intervals like clockwork patterns. When do all patterns overlap again?",
                solved: false
            },
            securityDoor: {
                question: "I can unlock any door, yet I am not a key. I am spoken, not held. I am known but not seen. Say me wrong, and you stay locked in. What am I?",
                answer: "password",
                hint: "You don’t carry this in your pocket, but you enter this to gain access. Often changed, sometimes forgotten. Starts with letter P.",
                solved: false
            },
            // Ballroom_1 (Detective A - Room 3)
            portrait_ballroom: {
                question: "The portrait shows Alistair Blackwood. What number summ is hidden in the curtain folds?",
                answer: "78",
                hint: "Add them together and think about witch numbers you see",
                solved: false
            },
            chandelier: {
                question: "Your partner also in this room. there are two chandeliers. talk with your partner using the chat. and answer, How many light do the chandeliers have?",
                answer: "19",
                hint: "Remember there are 2 chandeliers, since both players are in the same room",
                solved: false
            },
            // Ballroom_2 (Detective B - Room 3)
            Wallinscription: {
                question: "I twirl without feet, glide without hands. I dance with the guests as the music commands. No face do I have, yet many wear my guise, In this enchanted room where reflection never lies. Find me where echoes of waltzes remain and I shall unlock what the ballroom has chained.",
                answer: "mirror",
                hint: "6 letter word starts with M, So reflect a bit",
                solved: false
            },
            Listen: {
                question: "What is the awnser to everything? 0 ----- , 1 .---- , 2 ..--- , 3 ...-- , 4 ....- , 5 ..... , 6 -.... , 7 --... , 8 ---.. , 9 ----.",
                answer: "42",
                hint: "Listen closely to the background music",
                solved: false
            }
        }
    };

    // DOM Elements
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const messages = document.getElementById('messages');
    const createBtn = document.getElementById('create-btn');
    const joinBtn = document.getElementById('join-btn');
    const playerRole = document.getElementById('player-role');
    const roomCodeDisplay = document.getElementById('room-code-display');
    const lobby = document.getElementById('lobby');
    const gameContainer = document.getElementById('game-container');
    const player1Scene = document.getElementById('player1-scene');
    const player2Scene = document.getElementById('player2-scene');
    const player1Scene2 = document.getElementById('player1-scene-2');
    const player2Scene2 = document.getElementById('player2-scene-2');
    const finalScene = document.getElementById('final-scene');
    const challengeList = document.getElementById('challenge-list');
    const gameObjects = document.querySelectorAll('.game-object');
    const waitingRoom = document.getElementById('waiting-room');
    const waitingMessages = document.getElementById('waiting-messages');
    const introVideoOverlay = document.getElementById('intro-video-overlay');
    const introVideo = document.getElementById('intro-video');
    const transitionOverlay = document.getElementById('transition-overlay');
    const transitionMessage = document.getElementById('transition-message');

    // Add modal for riddle prompt and hint
    let riddleModal = document.getElementById('riddle-modal');
    if (!riddleModal) {
        // Attach modal to game-view, not body
        const gameView = document.getElementById('game-view');
        riddleModal = document.createElement('div');
        riddleModal.id = 'riddle-modal';
        riddleModal.style = 'display:none; position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:520px; max-width:90vw; min-width:340px; background:rgba(34,34,34,0.98); z-index:999; justify-content:center; align-items:center; border-radius:18px; box-shadow:0 8px 32px rgba(0,0,0,0.7);';
        riddleModal.innerHTML =
          '<div id="riddle-modal-content" style="background:none; color:#fff; border-radius:16px; padding:32px 32px 24px 32px; min-width:320px; max-width:90vw; text-align:center; position:relative;">' +
            '<div id="riddle-question" style="font-size:1.2rem; margin-bottom:16px;"></div>' +
            '<input id="riddle-answer" type="text" style="width:90%; padding:10px; font-size:1.1rem; margin-bottom:12px; border-radius:8px; border:none;" placeholder="Your answer..." />' +
            '<div style="margin-bottom:12px;">' +
              '<button id="riddle-hint-btn" style="margin-right:8px; padding:8px 22px; border-radius:8px; background:#444; color:#fff; border:none; cursor:pointer;">Hint</button>' +
              '<button id="riddle-submit-btn" style="padding:8px 22px; border-radius:8px; background:#D4AF37; color:#222; border:none; cursor:pointer;">Submit</button>' +
            '</div>' +
            '<div id="riddle-hint" style="display:none; background:#333; color:#FFD700; border-radius:8px; padding:10px; margin-bottom:8px; font-size:1rem;"></div>' +
            '<button id="riddle-cancel-btn" style="position:absolute; top:8px; right:8px; background:none; color:#fff; border:none; font-size:1.2rem; cursor:pointer;">&times;</button>' +
          '</div>';
        gameView.appendChild(riddleModal);
    }

    function sendMessage(msg, role) {
        db.collection("rooms").doc(gameState.roomId).collection("messages").add({
            sender: role,
            text: msg,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    function listenForMessages() {
        db.collection("rooms").doc(gameState.roomId).collection("messages")
            .orderBy("timestamp")
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        const data = change.doc.data();
                        let className = 'message';
                        let senderLabel = data.sender;
                        if (data.sender === 'System') {
                            className += ' system';
                        } else if (data.sender === 'Player 1') {
                            className += ' player-1';
                            senderLabel = 'Detective A';
                        } else if (data.sender === 'Player 2') {
                            className += ' player-2';
                            senderLabel = 'Detective B';
                        }
                        const div = document.createElement('div');
                        div.className = className;
                        div.textContent = senderLabel + ': ' + data.text;
                        messages.appendChild(div);
                        messages.scrollTop = messages.scrollHeight;
                    }
                });
            });
    }

    function updateFinishState() {
        db.collection("rooms").doc(gameState.roomId).set({
            [gameState.player === 1 ? "player1Finished" : "player2Finished"]: true
        }, { merge: true });

        // After solving both rooms, show player-specific ballroom as the third room
        setTimeout(() => {
            if (
                gameState.player === 1 &&
                gameState.riddleState.chest.solved &&
                gameState.riddleState.bookshelf.solved &&
                gameState.riddleState.candle.solved
            ) {
                player1Scene2.style.display = 'none';
                document.getElementById('player1-ballroom').style.display = 'block';
            }
            if (
                gameState.player === 2 &&
                gameState.riddleState.safe.solved &&
                gameState.riddleState.monitor.solved &&
                gameState.riddleState.securityDoor.solved
            ) {
                player2Scene2.style.display = 'none';
                document.getElementById('player2-ballroom').style.display = 'block';
            }
        }, 1600);

        // After solving both ballroom riddles, show waiting screen for this player
        setTimeout(() => {
            if (
                (gameState.player === 1 && gameState.riddleState.portrait_ballroom.solved && gameState.riddleState.chandelier.solved) ||
                (gameState.player === 2 && gameState.riddleState.Wallinscription.solved && gameState.riddleState.Listen.solved)
            ) {
                document.getElementById('player1-ballroom').style.display = 'none';
                document.getElementById('player2-ballroom').style.display = 'none';
                showTransitionOverlay('Waiting for the other detective to finish...');
                db.collection("rooms").doc(gameState.roomId).set({
                    [gameState.player === 1 ? "player1BallroomDone" : "player2BallroomDone"]: true
                }, { merge: true });
                // Listen for both players to finish
                db.collection("rooms").doc(gameState.roomId).onSnapshot(doc => {
                    const data = doc.data();
                    if (data.player1BallroomDone && data.player2BallroomDone) {
                        hideTransitionOverlay();
                        // Show final video overlay
                        const finalVideoOverlay = document.getElementById('final-video-overlay');
                        finalVideoOverlay.style.display = 'flex';
                        const finalVideo = document.getElementById('final-video');
                        finalVideo.currentTime = 0;
                        finalVideo.play();
                        // Add skip button for final video (per player)
                        let skipFinalBtn = document.getElementById('skip-final-btn');
                        if (!skipFinalBtn) {
                            skipFinalBtn = document.createElement('button');
                            skipFinalBtn.id = 'skip-final-btn';
                            skipFinalBtn.textContent = 'Skip';
                            skipFinalBtn.style = 'position:absolute;top:24px;right:24px;padding:10px 20px;font-size:1.2rem;z-index:10;background:#222;color:#fff;border-radius:8px;border:none;cursor:pointer;opacity:0.8;';
                            skipFinalBtn.onclick = () => {
                                finalVideo.pause();
                                finalVideoOverlay.style.display = 'none';
                                showCongratsOverlay();
                            };
                            finalVideoOverlay.appendChild(skipFinalBtn);
                        } else {
                            skipFinalBtn.style.display = 'block';
                        }
                        // Only show congrats after video finishes (remove controls to prevent skipping)
                        finalVideo.controls = false;
                        finalVideo.onended = () => {
                            finalVideoOverlay.style.display = 'none';
                            showCongratsOverlay();
                        };
                    }
                });
            }
        }, 1600);
    }

    function addCompletedChallenge(objectName) {
        const li = document.createElement('li');
        li.textContent = '\u2705 ' + objectName + ' Challenge Fixed';
        challengeList.appendChild(li);
        const obj = document.querySelector('.game-object[data-object="' + objectName + '"]');
        if (obj) obj.classList.add("solved-object");
    }

    function showRiddleModal(riddle, onSubmit) {
        document.getElementById('riddle-question').textContent = riddle.question;
        document.getElementById('riddle-hint').style.display = 'none';
        document.getElementById('riddle-hint').textContent = riddle.hint;
        // Always clear the answer input for a new riddle
        const riddleAnswerInput = document.getElementById('riddle-answer');
        if (riddleAnswerInput) riddleAnswerInput.value = '';
        // Remove any previous event listener to avoid duplicate submits
        if (riddleAnswerInput) {
            riddleAnswerInput.onkeydown = null;
        }
        // Custom input for bookshelf puzzle
        if (riddle === gameState.riddleState.bookshelf) {
            // Make modal taller and wider for bookshelf
            riddleModal.style.width = '800px';
            riddleModal.style.minHeight = '520px';
            document.getElementById('riddle-answer').style.display = 'none';
            // Remove old grid if present
            const oldGrid = document.getElementById('bookshelf-grid');
            if (oldGrid) oldGrid.remove();
            // Add 9 small boxes (3x3 grid)
            const modalContent = document.getElementById('riddle-modal-content');
            const grid = document.createElement('div');
            grid.id = 'bookshelf-grid';
            grid.style = 'display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:18px; justify-items:center;';
            const labels = ['Title', 'Color', 'Language'];
            const ids = ['title', 'color', 'lang'];
            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.maxLength = 12;
                    input.style = 'width:110px; padding:6px; font-size:1rem; border-radius:6px; border:none; text-align:center;';
                    input.placeholder = labels[row] + ' ' + (col+1);
                    input.id = 'bookshelf-' + ids[row] + (col+1);
                    grid.appendChild(input);
                }
            }
            modalContent.insertBefore(grid, document.getElementById('riddle-hint-btn').parentNode);
        } else if (riddle === gameState.riddleState.monitor) {
            riddleModal.style.width = '520px';
            riddleModal.style.minHeight = '';
            document.getElementById('riddle-answer').style.display = 'none';
            // Remove old monitor input if present
            const oldMonitor = document.getElementById('monitor-answer-box');
            if (oldMonitor) oldMonitor.remove();
            // Add custom answer input for monitor
            const modalContent = document.getElementById('riddle-modal-content');
            const monitorDiv = document.createElement('div');
            monitorDiv.id = 'monitor-answer-box';
            monitorDiv.style = 'margin-bottom:16px;';
            monitorDiv.innerHTML = '<span style="font-size:1.2rem;">10: </span>' +
                '<input id="monitor-answer" type="text" maxlength="2" style="width:40px; padding:6px; font-size:1.2rem; text-align:center; border-radius:6px; border:none; margin:0 6px;">' +
                '<span style="font-size:1.2rem;"> AM</span>';
            modalContent.insertBefore(monitorDiv, document.getElementById('riddle-hint-btn').parentNode);
            // Add Enter key support for monitor answer
            setTimeout(() => {
                const monitorInput = document.getElementById('monitor-answer');
                if (monitorInput) {
                    monitorInput.onkeydown = function(e) {
                        if (e.key === 'Enter') {
                            document.getElementById('riddle-submit-btn').click();
                        }
                    };
                }
            }, 0);
        } else {
            riddleModal.style.width = '520px';
            riddleModal.style.minHeight = '';
            document.getElementById('riddle-answer').style.display = '';
            // Remove bookshelf grid if present
            const oldGrid = document.getElementById('bookshelf-grid');
            if (oldGrid) oldGrid.remove();
            // Remove monitor input if present
            const oldMonitor = document.getElementById('monitor-answer-box');
            if (oldMonitor) oldMonitor.remove();
            // Add Enter key support for riddle answer
            if (riddleAnswerInput) {
                riddleAnswerInput.onkeydown = function(e) {
                    if (e.key === 'Enter') {
                        document.getElementById('riddle-submit-btn').click();
                    }
                };
            }
        }
        riddleModal.style.display = 'flex';
        if (riddle === gameState.riddleState.bookshelf) {
            document.getElementById('bookshelf-title1').focus();
        } else if (riddle === gameState.riddleState.monitor) {
            document.getElementById('monitor-answer').focus();
            document.getElementById('riddle-submit-btn').textContent = 'Submit';
        } else {
            document.getElementById('riddle-answer').focus();
            document.getElementById('riddle-submit-btn').textContent = 'Submit';
        }

        document.getElementById('riddle-hint-btn').onclick = () => {
            document.getElementById('riddle-hint').style.display = 'block';
        };
        document.getElementById('riddle-submit-btn').onclick = () => {
            if (riddle === gameState.riddleState.bookshelf) {
                // Collect all 9 answers
                const answers = [];
                for (let row of ['title','color','lang']) {
                    for (let col = 1; col <= 3; col++) {
                        answers.push(document.getElementById('bookshelf-' + row + col).value.trim().toLowerCase());
                    }
                }
                riddleModal.style.display = 'none';
                onSubmit(answers);
            } else if (riddle === gameState.riddleState.monitor) {
                const monitorAns = document.getElementById('monitor-answer').value.trim();
                riddleModal.style.display = 'none';
                onSubmit(monitorAns);
            } else {
                const answer = document.getElementById('riddle-answer').value;
                riddleModal.style.display = 'none';
                onSubmit(answer);
            }
        };
        document.getElementById('riddle-cancel-btn').onclick = () => {
            riddleModal.style.display = 'none';
        };
    }

    function handleRiddleClick(event) {
        const objectName = event.target.getAttribute('data-object');
        const riddle = gameState.riddleState[objectName];
        if (!riddle || riddle.solved) {
            alert("Already solved or invalid.");
            return;
        }

        showRiddleModal(riddle, function(answer) {
            if (!answer) return;
            let correct = false;
            if (objectName === 'bookshelf') {
                // answer is an array of 9 values: [title1, title2, title3, color1, color2, color3, lang1, lang2, lang3]
                const expectedTitles = ['alchemy','anatomy','astrology'];
                const expectedColors = ['red','green','black'];
                const expectedLangs = ['greek','arabic','latin'];
                correct = (
                    answer[0] === expectedTitles[0] &&
                    answer[1] === expectedTitles[1] &&
                    answer[2] === expectedTitles[2] &&
                    answer[3] === expectedColors[0] &&
                    answer[4] === expectedColors[1] &&
                    answer[5] === expectedColors[2] &&
                    answer[6] === expectedLangs[0] &&
                    answer[7] === expectedLangs[1] &&
                    answer[8] === expectedLangs[2]
                );
            } else {
                const cleaned = typeof answer === 'string' ? answer.trim().toLowerCase() : '';
                correct = cleaned === riddle.answer.toLowerCase() ||
                    (riddle.alternateAnswer && cleaned === riddle.alternateAnswer.toLowerCase());
            }

            if (correct) {
                riddle.solved = true;
                sendMessage(gameState.playerName + ' solved ' + objectName+ ': ' + riddle.answer, gameState.player === 1 ? 'Player 1' : 'Player 2');
                addCompletedChallenge(objectName);

                if (objectName === 'finale') {
                    alert(typeof answer === 'string' && answer.trim().toLowerCase() === "partner" ? "Congratulations! You solved the mystery!" : "A terrifying truth revealed...");
                    window.location.href = "victory.html";
                    return;
                }

                const player1Set1 = ['portrait', 'typewriter', 'cabinet'];
                const player1Set2 = ['chest', 'bookshelf', 'candle'];
                const player2Set1 = ['chalkboard', 'bloodStainedTable', 'hiddenFormula'];
                const player2Set2 = ['safe', 'monitor', 'securityDoor'];

                // Only show transition if this is the last unsolved riddle in the set
                function isLastUnsolved(set) {
                    return set.filter(k => !gameState.riddleState[k].solved).length === 0 && set.includes(objectName);
                }

                // Player 1: Study -> Library
                if (gameState.player === 1 && isLastUnsolved(player1Set1)) {
                    showTransitionOverlay();
                    setTimeout(() => {
                        hideTransitionOverlay();
                        player1Scene.style.display = 'none';
                        player1Scene2.style.display = 'block';
                        sendMessage("Detective A completed Study Room.", "System");
                    }, 1500);
                }

                // Player 1: Library -> Ballroom 1
                if (gameState.player === 1 && isLastUnsolved(player1Set2)) {
                    showTransitionOverlay();
                    setTimeout(() => {
                        hideTransitionOverlay();
                        player1Scene2.style.display = 'none';
                        document.getElementById('player1-ballroom').style.display = 'block';
                        sendMessage("Detective A entered Ballroom 1.", "System");
                    }, 1500);
                }

                // Player 2: Lab -> Security Room
                if (gameState.player === 2 && isLastUnsolved(player2Set1)) {
                    showTransitionOverlay();
                    setTimeout(() => {
                        hideTransitionOverlay();
                        player2Scene.style.display = 'none';
                        player2Scene2.style.display = 'block';
                        sendMessage("Detective B completed Lab.", "System");
                    }, 1500);
                }

                // Player 2: Security Room -> Ballroom 2
                if (gameState.player === 2 && isLastUnsolved(player2Set2)) {
                    showTransitionOverlay();
                    setTimeout(() => {
                        hideTransitionOverlay();
                        player2Scene2.style.display = 'none';
                        document.getElementById('player2-ballroom').style.display = 'block';
                        sendMessage("Detective B entered Ballroom 2.", "System");
                    }, 1500);
                }

            } else {
                sendMessage(gameState.playerName + ' attempted ' + objectName + ' but failed', gameState.player === 1 ? 'Player 1' : 'Player 2');
            }

            // Trigger ballroom finale logic if a ballroom riddle was just solved
            if (
                (gameState.player === 1 && (objectName === 'portrait_ballroom' || objectName === 'chandelier')) ||
                (gameState.player === 2 && (objectName === 'Wallinscription' || objectName === 'Listen'))
            ) {
                checkBallroomCompletion();
            }
        });
    }

    function showWaitingRoom(isPlayer1) {
        lobby.style.display = 'none';
        gameContainer.style.display = 'none';
        waitingRoom.style.display = 'block';
        if (isPlayer1) {
            waitingMessages.innerHTML = '<div>Detective A joined</div><div>Waiting for Detective B</div>';
        } else {
            waitingMessages.innerHTML = '<div>Detective A joined</div><div>Detective B joined</div><div>Proceeding to the game</div>';
        }
    }

    // --- GAME RESET LOGIC ---
    function resetGameStateAndUI() {
        // Hide all overlays
        document.getElementById('eternalis-congrats').style.display = 'none';
        document.getElementById('final-video-overlay').style.display = 'none';
        document.getElementById('intro-video-overlay').style.display = 'none';
        document.getElementById('waiting-room').style.display = 'none';
        document.getElementById('transition-overlay').style.display = 'none';
        // Hide all scenes
        document.querySelectorAll('.scene').forEach(scene => scene.style.display = 'none');
        // Hide game container, show lobby
        document.getElementById('game-container').style.display = 'none';
        document.getElementById('lobby').style.display = 'flex';
        // Show both create/join sections
        document.getElementById('create-game').style.display = 'block';
        document.getElementById('join-game').style.display = 'block';
        // Reset header info
        document.getElementById('player-role').textContent = '';
        document.getElementById('room-code-display').textContent = '';
        // Reset inventory, chat, progress, hints, riddles, etc.
        document.getElementById('inventory-items').innerHTML = '';
        document.getElementById('messages').innerHTML = '';
        document.getElementById('game-progress').style.width = '0%';
        document.getElementById('hint-text').textContent = '';
        document.getElementById('challenge-list').innerHTML = '';
        // Remove solved-object classes
        document.querySelectorAll('.game-object.solved-object').forEach(obj => obj.classList.remove('solved-object'));
        // Reset gameState object (keep only persistent properties if needed)
        if (window.gameState) {
            window.gameState = { started: false };
        }
        // Remove any skip button from previous intro
        const skipBtn = document.getElementById('skip-intro-btn');
        if (skipBtn && skipBtn.parentNode) skipBtn.parentNode.removeChild(skipBtn);
        // Remove skip button from final video
        const skipFinalBtn = document.getElementById('skip-final-btn');
        if (skipFinalBtn && skipFinalBtn.parentNode) skipFinalBtn.parentNode.removeChild(skipFinalBtn);
        // Pause and reset background audio
        pauseBgAudio();
        audioEnabled = true;
        if (muteBtn) muteBtn.textContent = 'Mute';
    }

    function showIntroVideoAndStartGame() {
        if (gameState.started) return; // Prevent double intro
        gameState.started = true;
        waitingRoom.style.display = 'none';
        introVideoOverlay.style.display = 'flex';
        introVideo.currentTime = 0;
        introVideo.play();
        introVideo.onended = () => {
            introVideoOverlay.style.display = 'none';
            startGame();
        };
        // Always (re)create skip button
        let skipBtn = document.getElementById('skip-intro-btn');
        if (!skipBtn) {
            skipBtn = document.createElement('button');
            skipBtn.id = 'skip-intro-btn';
            skipBtn.textContent = 'Skip Intro';
            skipBtn.style = 'position:absolute;top:24px;right:24px;padding:10px 20px;font-size:1.2rem;z-index:10;background:#222;color:#fff;border-radius:8px;border:none;cursor:pointer;opacity:0.8;';
            skipBtn.onclick = () => {
                introVideo.pause();
                introVideoOverlay.style.display = 'none';
                startGame();
            };
            introVideoOverlay.appendChild(skipBtn);
        } else {
            skipBtn.style.display = 'block';
        }
    }

    function listenForPlayers() {
        db.collection('rooms').doc(gameState.roomId).onSnapshot(doc => {
            const data = doc.data();
            if (!data) return;
            let aJoined = !!data.player1Joined;
            let bJoined = !!data.player2Joined;
            if (gameState.player === 1) {
                if (aJoined && !bJoined) {
                    showWaitingRoom(true);
                } else if (aJoined && bJoined && !gameState.started) {
                    waitingMessages.innerHTML = '<div>Detective A joined</div><div>Detective B joined</div><div>Proceeding to the game</div>';
                    setTimeout(() => {
                        showIntroVideoAndStartGame();
                    }, 1200);
                }
            } else if (gameState.player === 2) {
                if (aJoined && bJoined && !gameState.started) {
                    showWaitingRoom(false);
                    setTimeout(() => {
                        showIntroVideoAndStartGame();
                    }, 1200);
                }
            }
        });
    }

    // --- Background Audio Setup ---
    let bgAudio = new Audio('src/static/audios/Horror_Background.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.5;
    let audioEnabled = true;
    const volumeSlider = document.getElementById('volume');
    const muteBtn = document.getElementById('mute-toggle');

    function playBgAudio() {
        if (audioEnabled) {
            bgAudio.play().catch(()=>{});
        }
    }
    function pauseBgAudio() {
        bgAudio.pause();
        bgAudio.currentTime = 0;
    }
    if (volumeSlider) {
        volumeSlider.addEventListener('input', e => {
            bgAudio.volume = parseFloat(e.target.value);
        });
    }
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            if (audioEnabled) {
                muteBtn.textContent = 'Mute';
                playBgAudio();
            } else {
                muteBtn.textContent = 'Unmute';
                pauseBgAudio();
            }
        });
    }
    // --- Play audio only in game rooms, pause on transition overlay ---
    function showTransitionOverlay(message = 'Proceeding to the next room...') {
        transitionMessage.textContent = message;
        transitionOverlay.style.display = 'flex';
        pauseBgAudio();
    }
    function hideTransitionOverlay() {
        transitionOverlay.style.display = 'none';
        playBgAudio();
    }
    // Play audio when entering game rooms
    function startGame() {
        lobby.style.display = 'none';
        gameContainer.style.display = 'grid';
        playerRole.textContent = gameState.player === 1 ? 'Detective A' : 'Detective B';
        roomCodeDisplay.textContent = gameState.roomId;
        playBgAudio();
        if (gameState.player === 1) player1Scene.style.display = 'block';
        else player2Scene.style.display = 'block';

        sendMessage('You are connected with ' + gameState.partnerName, 'System');
        sendMessage("Solve your puzzles to progress!", "System");

        gameObjects.forEach(obj => obj.addEventListener('click', handleRiddleClick));
        listenForMessages();
    }

    createBtn.addEventListener('click', () => {
        const name = document.getElementById('player1-name').value.trim();
        if (!name) return alert("Enter name.");
        gameState.player = 1;
        gameState.playerName = name;
        gameState.roomId = Math.random().toString(36).substr(2, 4).toUpperCase();
        gameState.partnerName = "Player 2";
        // Set player1Joined in Firestore
        db.collection('rooms').doc(gameState.roomId).set({
            player1Joined: true,
            player2Joined: false
        });
        showWaitingRoom(true);
        listenForPlayers();
        alert('Room created. Share code: ' + gameState.roomId);
    });

    joinBtn.addEventListener('click', () => {
        const name = document.getElementById('player2-name').value.trim();
        const room = document.getElementById('room-id').value.trim().toUpperCase();
        if (!name || !room || room.length !== 4) return alert("Enter valid name and room code");
        gameState.player = 2;
        gameState.playerName = name;
        gameState.roomId = room;
        gameState.partnerName = "Player 1";
        // Set player2Joined in Firestore
        db.collection('rooms').doc(gameState.roomId).set({
            player2Joined: true
        }, { merge: true });
        listenForPlayers();
        showWaitingRoom(false);
    });

    chatForm.addEventListener('submit', e => {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (msg) {
            sendMessage(msg, gameState.player === 1 ? 'Player 1' : 'Player 2');
            chatInput.value = '';
        }
    });

    // Finale click logic
    document.querySelectorAll('[data-object="finale"]').forEach(el => {
        el.addEventListener('click', () => {
            const finale = gameState.riddleState.finale;
            if (finale.solved) return alert("Already solved.");
            const input = prompt(finale.question);
            if (!input) return;
            const answer = input.trim().toLowerCase();
            if (answer === finale.answer || answer === finale.alternateAnswer) {
                finale.solved = true;
                alert(answer === "partner" ? "Congratulations! You solved the mystery!" : "You uncovered a darker truth!");
                window.location.href = "victory.html";
            } else {
                alert("Wrong answer. Try again.");
            }
        });
    });

    // Leave Game button: redirect to menu (lobby)
    const leaveBtn = document.getElementById('leave-btn');
    if (leaveBtn) {
        leaveBtn.onclick = () => {
            // Clear session
            localStorage.removeItem('playerName');
            localStorage.removeItem('player');
            localStorage.removeItem('roomId');
            // Optionally, clear any other state
            // Show lobby, hide game
            gameContainer.style.display = 'none';
            lobby.style.display = 'flex';
            // Optionally reload page for a clean state
            // location.reload();
        };
    }

    // Change Monitor object label in Security Room to 'Camera Feed'
    document.querySelectorAll('.game-object[data-object="monitor"]').forEach(function(el) {
        el.textContent = 'Camera Feed';
    });

    // After both ballroom riddles, show waiting screen for this player
    function checkBallroomCompletion() {
        // Only trigger if both ballroom riddles are solved for this player
        if (
            (gameState.player === 1 && gameState.riddleState.portrait_ballroom.solved && gameState.riddleState.chandelier.solved) ||
            (gameState.player === 2 && gameState.riddleState.Wallinscription.solved && gameState.riddleState.Listen.solved)
        ) {
            // Hide only this player's ballroom
            if (gameState.player === 1) {
                const ballroom1 = document.getElementById('player1-ballroom');
                if (ballroom1) ballroom1.style.display = 'none';
            }
            if (gameState.player === 2) {
                const ballroom2 = document.getElementById('player2-ballroom');
                if (ballroom2) ballroom2.style.display = 'none';
            }
            showTransitionOverlay('Waiting for the other detective to finish...');
            // Mark this player as done in Firestore
            db.collection("rooms").doc(gameState.roomId).set({
                [gameState.player === 1 ? "player1BallroomDone" : "player2BallroomDone"]: true
            }, { merge: true });
            // Listen for both players to finish
            db.collection("rooms").doc(gameState.roomId).onSnapshot(doc => {
                const data = doc.data();
                if (data.player1BallroomDone && data.player2BallroomDone) {
                    // Both finished: update overlay for both, then proceed after a short delay
                    showTransitionOverlay('Both detectives are finished, proceeding...');
                    setTimeout(() => {
                        hideTransitionOverlay();
                        // Pause background music before showing final video
                        pauseBgAudio();
                        // Show final video overlay (only for this player, not synced)
                        const finalVideoOverlay = document.getElementById('final-video-overlay');
                        finalVideoOverlay.style.display = 'flex';
                        const finalVideo = document.getElementById('final-video');
                        finalVideo.currentTime = 0;
                        finalVideo.play();
                        // Add skip button for final video (local only)
                        let skipFinalBtn = document.getElementById('skip-final-btn');
                        if (!skipFinalBtn) {
                            skipFinalBtn = document.createElement('button');
                            skipFinalBtn.id = 'skip-final-btn';
                            skipFinalBtn.textContent = 'Skip';
                            skipFinalBtn.style = 'position:absolute;top:24px;right:24px;padding:10px 20px;font-size:1.2rem;z-index:10;background:#222;color:#fff;border-radius:8px;border:none;cursor:pointer;opacity:0.8;';
                            skipFinalBtn.onclick = () => {
                                finalVideo.pause();
                                finalVideoOverlay.style.display = 'none';
                                showCongratsOverlay();
                            };
                            finalVideoOverlay.appendChild(skipFinalBtn);
                        } else {
                            skipFinalBtn.style.display = 'block';
                        }
                        // Only show congrats after video finishes (remove controls to prevent skipping)
                        finalVideo.controls = false;
                        finalVideo.onended = () => {
                            finalVideoOverlay.style.display = 'none';
                            showCongratsOverlay();
                        };
                    }, 2000); // 2 seconds for the new relay
                }
            });
        }
    }

    function showCongratsOverlay() {
        // Show congrats overlay for 10 seconds
        const congrats = document.getElementById('eternalis-congrats');
        congrats.querySelector('h1').textContent = 'Congratulations!';
        congrats.querySelector('p').textContent = 'You found Alistair Blackwood and his secret Eternalis';
        congrats.style.display = 'flex';
        setTimeout(() => {
            congrats.style.display = 'none';
            resetGameStateAndUI();
            const finalVideo = document.getElementById('final-video');
            finalVideo.controls = true;
        }, 10000);
    }
    // ...existing code...
});
