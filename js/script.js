if (window.sessionStorage.name) {
    document.querySelector('.name span').innerHTML = window.sessionStorage.name || 'Unknown';
    document.querySelector('.control-buttons span').parentNode.remove()
} else {
    // Select the start game button
    document.querySelector('.control-buttons span').onclick = function () {
        let yourName = prompt("Please Enter Your Name");
        window.sessionStorage.name = yourName || 'Unknown';
        document.querySelector('.name span').innerHTML = window.sessionStorage.name;
        this.parentNode.remove()
    }
}
// Order Elements Randomly
let duration = 1000;
let blocksContainer = document.querySelector('.memory-game-blocks');
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()]
shuffle(orderRange);
blocks.forEach((block, index) => {
    // Add CSS order property
    block.style.order = orderRange[index];

    // Flip the block
    block.addEventListener('click', function () {
        flipBlock(this)
    })
})

function shuffle(arr) {
    counter = 0
    while (counter < arr.length) {
        let random = Math.floor(Math.random() * arr.length);
        [arr[counter], arr[random]] = [arr[random], arr[counter]]
        counter++
    }
    return arr;
}

function flipBlock(block) {
    // Add class is-flipped
    block.classList.add('is-flipped');

    // Is there two selected blocks
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if (allFlippedBlocks.length === 2) {
        // Stop clicking for a second
        noClicking()

        // Check if there are two matched blocks
        checkMatchedBlocks(...allFlippedBlocks)
    }
}

function noClicking() {
    blocksContainer.classList.add('no-clicking')
    setTimeout(() => blocksContainer.classList.remove('no-clicking'), duration)
}

function checkMatchedBlocks(firstBlock, secondBlock) {
    let tries = document.querySelector('.tries span');
    let removeIsFilledClass = () => {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
    }

    // if the blocks matched
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.add('has-matched');
        secondBlock.classList.add('has-matched');
        removeIsFilledClass()
        document.querySelector('.success').play()
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1
        setTimeout(removeIsFilledClass, duration);
        document.querySelector('.fail').play();
    }
}