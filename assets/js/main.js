gsap.registerPlugin(ScrollTrigger);

(() => {
    const specVideos = document.querySelectorAll('#specs video'),
        decorators = document.querySelectorAll('#decorator .decorator'),
        slogan = document.querySelector('#slogan h1'),
        originalText = slogan.innerText;

    const binaryAnimation = (target = slogan) => {
        if (!target) return;

        const halfLength = Math.round(originalText.length / 2);

        for (let i = 0; i < halfLength; i++) {
            const count = halfLength - i;

            first = setInterval(() => {
                changeText(i);
            }, 100);
            second = setInterval(() => {
                changeText(originalText.length - 1 - i);
            }, 100);

            setTimeout(() => {
                clearInterval(first);
                clearInterval(second);
                console.log('finish');

                const actualText = slogan.innerText.split('');

                actualText[i] = originalText[i];
                actualText[originalText.length - 1 - i] = originalText[originalText.length - 1 - i];

                slogan.innerText = actualText.join('');
            }, 100 * count);

        }
    };

    const changeText = (index = 0) => {
        const handler = {
            get: (target, name) => {
                return target.hasOwnProperty(name) ? target[name] : '1';
            }
        },
            options = {
                1: '0',
                0: '1',
            },
            dic = new Proxy(options, handler);

        const actualText = slogan.innerText.split('');
        actualText[index] = dic[slogan.innerText[index]];
        slogan.innerText = actualText.join('');
    }

    document.addEventListener('DOMContentLoaded', () => {
        // MAIN LOGO ANIMATION
        gsap.from(document.querySelector('#main .logo img'), {
            scrollTrigger: {
                trigger: '#main',
                toggleActions: 'play none none none',
            },
            right: '100%',
            duration: 1.2,
            ease: 'easeInOut',
        });
        // END MAIN LOGO ANIMATION

        // SLOGAN BINARY 1|0 ANIMATION
        // gsap.from(slogan, {
        //     scrollTrigger: {
        //         trigger: '#slogan h1',
        //         toggleActions: 'play none none reset',
        //         onEnter: binaryAnimation,
        //     }
        // });
        // END SLOGAN BINAY ANIMATION

        // DECORATOR ANIMATION
        let stOptions = {
            trigger: '#decorator .content',
            toggleActions: 'play none none reset',
        };

        gsap.from(document.querySelector('#decorator .logo-color'), {
            scrollTrigger: {
                trigger: '#decorator',
            },
            delay: 0.5,
            opacity: 0,
            duration: 1.5,
            ease: 'easeInOut',
        });

        gsap.from(decorators[0], {
            scrollTrigger: stOptions,
            x: '-5%',
            delay: 0.5,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: 'easeInOut',
        });

        gsap.from(decorators[1], {
            scrollTrigger: stOptions,
            y: '100%',
            opacity: 0,
            duration: 1.5,
            ease: 'easeInOut',
        });

        gsap.from([document.querySelector('#decorator .content h2'), document.querySelector('#decorator .content p')], {
            scrollTrigger: stOptions,
            y: '300%',
            opacity: 0,
            duration: 1.5,
            ease: 'easeInOuT',
        });
        // END DECORATOR ANIMATION

        // SPECS ANIMATION
        stOptions = {
            trigger: '#specs',
            toggleActions: 'play none none reset',
        };

        gsap.from(gsap.utils.toArray('#specs div:not(.container)'), {
            scrollTrigger: stOptions,
            scale: 1.1,
            opacity: 0,
            stagger: 0.5,
            ease: 'easeInOut',
        });

        for (const video of specVideos) {
            gsap.from(video, {
                scrollTrigger: {
                    trigger: video,
                    onEnter: () => {
                        video.play();
                    },
                    onLeaveBack: () => {
                        video.load();
                    },
                }
            });
        }

        gsap.from(gsap.utils.toArray('#specs h5'), {
            scrollTrigger: stOptions,
            y: '100%',
            opacity: 0,
            duration: 1.5,
            stagger: 0.5,
            delay: 0.5,
            ease: 'easeInOut',
        });

        gsap.from(gsap.utils.toArray('#specs p'), {
            scrollTrigger: stOptions,
            y: '100%',
            opacity: 0,
            stagger: 0.5,
            delay: 0.5,
            duration: 1.5,
            ease: 'easeInOut',
        });
        // END SPECS ANIMATION
    });
})();