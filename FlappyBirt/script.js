document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("flappyBirdCanvas");
    const ctx = canvas.getContext("2d");

    const bird = {
        x: 50,
        y: canvas.height / 2 - 10,
        radius: 10,
        velocity: 0,
        color: "#00F"
    };

    let obstacles = [];

    function drawBird() {
        ctx.beginPath();
        ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
        ctx.fillStyle = bird.color;
        ctx.fill();
        ctx.closePath();
    }

    function drawObstacles() {
        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            ctx.fillStyle = "#0F0";
            ctx.fillRect(obstacle.x, 0, obstacle.width, obstacle.height.top);
            ctx.fillRect(obstacle.x, obstacle.height.bottom, obstacle.width, canvas.height - obstacle.height.bottom);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        drawBird();
        drawObstacles();

        bird.velocity += 0.5; 
        bird.y += bird.velocity;

        if (bird.y + bird.radius > canvas.height || bird.y - bird.radius < 0) {
            gameOver();
        }

       
        for (let i = 0; i < obstacles.length; i++) {
            obstacles[i].x -= 2;
        }

        
        if (Math.floor(Math.random() * 100) === 0) {
            const obstacleHeight = Math.floor(Math.random() * (canvas.height / 2));
            obstacles.push({
                x: canvas.width,
                height: {
                    top: obstacleHeight,
                    bottom: obstacleHeight + 80
                },
                width: 20
            });
        }

        
        obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

       
        for (let i = 0; i < obstacles.length; i++) {
            const obstacle = obstacles[i];
            if (
                bird.x + bird.radius > obstacle.x &&
                bird.x - bird.radius < obstacle.x + obstacle.width &&
                (bird.y - bird.radius < obstacle.height.top || bird.y + bird.radius > obstacle.height.bottom)
            ) {
                gameOver();
            }
        }

        requestAnimationFrame(draw);
    }

    function jump() {
        bird.velocity = -8;
    }

    function gameOver() {
        alert("Game Over!");
        bird.y = canvas.height / 2 - 10;
        bird.velocity = 0;
        obstacles = [];
    }

    document.addEventListener("keydown", function(event) {
        if (event.code === "Space") {
            jump();
        }
    });

    draw();
});