document.querySelectorAll('[data-lang]').forEach(a=>a.addEventListener('click',()=>localStorage.setItem('hoc-lang',a.dataset.lang)));
