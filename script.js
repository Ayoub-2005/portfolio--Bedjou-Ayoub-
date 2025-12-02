// ============================================
// PARTIE 1 : CHARGEMENT INITIAL
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio chargé !");

    // ============================================
    // PARTIE 2 : SCROLL FLUIDE AVEC ANIMATION
    // ============================================
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // PARTIE 3 : DÉTECTION DE LA SECTION ACTIVE
    // ============================================
    function setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 250;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // ============================================
    // PARTIE 4 : EFFET HEADER AU SCROLL
    // ============================================
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ============================================
    // PARTIE 5 : ANIMATION HOVER SUR LES PROJETS
    // ============================================
    document.querySelectorAll(".project").forEach(project => {
        project.addEventListener("mouseover", function() {
            this.style.backgroundColor = "#D6E9F8";
            this.style.transition = "0.3s";
        });
        project.addEventListener("mouseout", function() {
            this.style.backgroundColor = "transparent";
        });
    });

    // ============================================
    // PARTIE 6 : ANIMATION DES BARRES DE COMPÉTENCES
    // ============================================
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }
    // ============================================
// GESTION DES CARTES FLIP (Compétences)
// ============================================
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
});

// Ajoute cette fonction dans ton script.js existant
// Place-la après la PARTIE 6 (Animation des barres de compétences)

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        // Toggle la classe flipped
        this.classList.toggle('flipped');
    });
});

    function animateSkills() {
        const bars = document.querySelectorAll('.level');

        bars.forEach(bar => {
            if (isInViewport(bar) && !bar.classList.contains('animated')) {
                const level = bar.getAttribute('data-level');
                if (level) {
                    bar.style.width = level + '%';
                }
                bar.classList.add('animated');
            }
        });
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills();


    // ============================================
    // PARTIE 6.5 : CARTES FLIP COMPÉTENCES
    // ============================================
    console.log("Initialisation des cartes flip...");
    
    setTimeout(function() {
        const skillCards = document.querySelectorAll('.skill-card');
        console.log("Nombre de cartes trouvées:", skillCards.length);
        
        if (skillCards.length > 0) {
            skillCards.forEach(card => {
                card.addEventListener('click', function(e) {
                    e.stopPropagation();
                    console.log("Carte cliquée!");
                    this.classList.toggle('flipped');
                });
            });
            console.log("✅ Cartes flip initialisées !");
        } else {
            console.error("❌ Aucune carte trouvée ! Vérifier le HTML.");
        }
    }, 500); // Attend 500ms que le DOM soit complètement chargé

    // ============================================
    // PARTIE 7 : FOND ÉTOILÉ AVEC ÉTOILES FILANTES
    // ============================================

    // Créer le canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');
    let starsArray = [];
    let shootingStarsArray = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    window.addEventListener('resize', () => {
        resizeCanvas();
        initStars();
    });

    // ============================================
    // CLASSE ÉTOILE FIXE (petites étoiles scintillantes)
    // ============================================
    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3;
            this.opacity = Math.random() * 0.7 + 0.3;
            this.twinkleSpeed = Math.random() * 0.015 + 0.005;
            this.twinkleDirection = Math.random() > 0.5 ? 1 : -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
            
            // Petit halo lumineux
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 220, 255, ${this.opacity * 0.15})`;
            ctx.fill();
        }

        update() {
            // Effet scintillement
            this.opacity += this.twinkleSpeed * this.twinkleDirection;
            
            if (this.opacity >= 1) {
                this.opacity = 1;
                this.twinkleDirection = -1;
            } else if (this.opacity <= 0.2) {
                this.opacity = 0.2;
                this.twinkleDirection = 1;
            }

            this.draw();
        }
    }

    // ============================================
    // CLASSE ÉTOILE FILANTE
    // ============================================
    class ShootingStar {
        constructor() {
            // Position de départ (en haut à droite généralement)
            this.x = Math.random() * canvas.width + 200;
            this.y = Math.random() * (canvas.height / 2) - 100;
            
            // Vitesse et direction
            this.speedX = -(Math.random() * 6 + 8); // Vers la gauche
            this.speedY = Math.random() * 4 + 3;    // Vers le bas
            
            // Taille et opacité
            this.length = Math.random() * 100 + 80;
            this.size = Math.random() * 1.5 + 1;
            this.opacity = 1;
            this.fadeSpeed = 0.015;
        }

        draw() {
            ctx.save();
            
            // Dessiner la traînée
            const gradient = ctx.createLinearGradient(
                this.x, 
                this.y, 
                this.x + this.length, 
                this.y + (this.length * (this.speedY / this.speedX))
            );
            
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(0.5, `rgba(200, 220, 255, ${this.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.size;
            ctx.lineCap = 'round';
            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x + this.length, 
                this.y + (this.length * (this.speedY / this.speedX))
            );
            ctx.stroke();
            
            // Point lumineux au début
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fill();
            
            ctx.restore();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= this.fadeSpeed;
            
            this.draw();
            
            // Retourne true si l'étoile est encore visible
            return this.opacity > 0 && this.x > -this.length;
        }
    }

    // ============================================
    // INITIALISER LES ÉTOILES FIXES
    // ============================================
    function initStars() {
        starsArray = [];
        const numberOfStars = Math.floor((canvas.width * canvas.height) / 3000);
        
        for (let i = 0; i < numberOfStars; i++) {
            starsArray.push(new Star());
        }
    }

    // ============================================
    // CRÉER UNE ÉTOILE FILANTE ALÉATOIREMENT
    // ============================================
    function createShootingStar() {
        // Probabilité de créer une étoile filante à chaque frame
        if (Math.random() < 0.003) { // 0.3% de chance par frame
            shootingStarsArray.push(new ShootingStar());
        }
    }

    // ============================================
    // ANIMATION PRINCIPALE
    // ============================================
    function animate() {
        requestAnimationFrame(animate);
        
        // Fond sombre avec léger effet de traînée
        ctx.fillStyle = 'rgba(10, 15, 35, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner les étoiles fixes
        starsArray.forEach(star => star.update());
        
        // Créer et dessiner les étoiles filantes
        createShootingStar();
        shootingStarsArray = shootingStarsArray.filter(star => star.update());
    }

    // Démarrer l'animation
    initStars();
    animate();

    console.log("✨ Ciel étoilé avec étoiles filantes chargé !");

    // SOLUTION DE SECOURS - Cartes flip
document.addEventListener('click', function(e) {
    const card = e.target.closest('.skill-card');
    if (card) {
        console.log("Carte cliquée via délégation !");
        card.classList.toggle('flipped');
    }
});
});


// Créer l'overlay une seule fois
const overlay = document.createElement("div");
overlay.id = "zoom-overlay";
document.body.appendChild(overlay);

// Fermer le zoom quand on clique sur l'image ou le fond
overlay.addEventListener("click", () => {
  overlay.style.display = "none";
  overlay.innerHTML = "";
});

// Ajouter l'effet zoom à chaque image
document.querySelectorAll(".zoomable").forEach(img => {
  img.addEventListener("click", () => {
    const zoomedImg = document.createElement("img");
    zoomedImg.src = img.src;
    zoomedImg.alt = img.alt;
    overlay.innerHTML = "";
    overlay.appendChild(zoomedImg);
    overlay.style.display = "flex";
  });
});


// Filtrage des certifications
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Retirer la classe active des autres boutons
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    document.querySelectorAll(".certification-card").forEach(card => {
      const cardCategory = card.getAttribute("data-category");
      if (category === "all" || cardCategory === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});


document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Activer le bouton sélectionné
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    document.querySelectorAll(".project").forEach(project => {
      const projectCategory = project.getAttribute("data-category");
      if (category === "all" || projectCategory === category) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

