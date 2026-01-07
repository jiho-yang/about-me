$(document).ready(function () {
    $('.single-item').slick({
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
    });

});

const gallery = {
    bedroom: [
        "img/inspire/b-01.jpg",
        "img/inspire/b-02.jpg",
        "img/inspire/b-03.jpg",
        "img/inspire/b-04.jpg",
        "img/inspire/b-05.jpg",
        "img/inspire/b-06.jpg",
        "img/inspire/b-07.jpg",
        "img/inspire/b-08.jpg",
        "img/inspire/b-09.jpg",
        "img/inspire/b-10.jpg",
        "img/inspire/b-11.jpg",
        "img/inspire/b-12.jpg",
    ],
    living: [
        "img/inspire/l-01.jpg",
        "img/inspire/l-02.jpg",
        "img/inspire/l-03.jpg",
        "img/inspire/l-04.jpg",
        "img/inspire/l-05.jpg",
        "img/inspire/l-06.jpg",
        "img/inspire/l-07.jpg",
        "img/inspire/l-08.jpg",
        "img/inspire/l-09.jpg",
        "img/inspire/l-10.jpg",
        "img/inspire/l-11.jpg",
        "img/inspire/l-12.jpg",
    ],
    kitchen: [
        "img/inspire/k-01.jpg",
        "img/inspire/k-02.jpg",
        "img/inspire/k-02.jpg",
        "img/inspire/k-03.jpg",
        "img/inspire/k-04.jpg",
        "img/inspire/k-05.jpg",
        "img/inspire/k-06.jpg",
        "img/inspire/k-07.jpg",
        "img/inspire/k-08.jpg",
        "img/inspire/k-09.jpg",
        "img/inspire/k-10.jpg",
        "img/inspire/k-11.jpg",
        "img/inspire/k-12.jpg",
    ],
    office: [
        "img/inspire/o-01.jpg",
        "img/inspire/o-02.jpg",
        "img/inspire/o-03.jpg",
        "img/inspire/o-04.jpg",
        "img/inspire/o-05.jpg",
        "img/inspire/o-06.jpg",
        "img/inspire/o-07.jpg",
        "img/inspire/o-08.jpg",
        "img/inspire/o-09.jpg",
        "img/inspire/o-10.jpg",
        "img/inspire/o-11.jpg",
    ],
    outdoor: [
        "img/inspire/t-01.jpg",
        "img/inspire/t-02.jpg",
        "img/inspire/t-03.jpg",
        "img/inspire/t-04.jpg",
        "img/inspire/t-05.jpg",
        "img/inspire/t-06.jpg",
        "img/inspire/t-07.jpg",
        "img/inspire/t-08.jpg",
        "img/inspire/t-09.jpg",
        "img/inspire/t-10.jpg",
        "img/inspire/t-11.jpg",
    ],
    bath: [
        "img/inspire/bth-01.jpg",
        "img/inspire/bth-02.jpg",
        "img/inspire/bth-03.jpg",
        "img/inspire/bth-04.jpg",
        "img/inspire/bth-05.jpg",
        "img/inspire/bth-06.jpg",
        "img/inspire/bth-07.jpg",
        "img/inspire/bth-08.jpg",
        "img/inspire/bth-09.jpg",
        "img/inspire/bth-10.jpg",
        "img/inspire/bth-11.jpg",
        "img/inspire/bth-12.jpg",
    ],
    kids: [
        "img/inspire/kids-01.jpg",
        "img/inspire/kids-02.jpg",
        "img/inspire/kids-03.jpg",
        "img/inspire/kids-04.jpg",
        "img/inspire/kids-05.jpg",
        "img/inspire/kids-06.jpg",
        "img/inspire/kids-07.jpg",
        "img/inspire/kids-08.jpg",
        "img/inspire/kids-09.jpg",
        "img/inspire/kids-10.jpg",
        "img/inspire/kids-11.jpg",
        "img/inspire/kids-12.jpg",
    ],
};

const grid = document.querySelector("#inspireGrid");
const tabs = document.querySelectorAll(".inspire-tabs .tab");
const loadMoreBtn = document.querySelector("#loadMoreBtn");

const PAGE_SIZE = 6;

let currentCat = "all";
let currentList = [];
let visibleCount = 0;

function getAllImages() {
    return Object.values(gallery).flat();
}

function updateLoadMoreButton() {
    const hasMore = visibleCount < currentList.length;

    loadMoreBtn.style.display = hasMore ? "block" : "none";

    if (hasMore) {
        const remain = currentList.length - visibleCount;
        const nextCount = Math.min(PAGE_SIZE, remain);
        loadMoreBtn.textContent = `${nextCount}개 더 보기`;
    }
}

function buildHTML(list, enter = false) {
    const enterClass = enter ? " is-enter" : "";
    return list
        .map(
            (src) => `
        <a class="inspire-item${enterClass}" href="#">
          <img src="${src}" alt="">
        </a>
      `
        )
        .join("");
}

function render(cat, reset = true) {
    currentCat = cat;
    currentList = cat === "all" ? getAllImages() : (gallery[cat] || []);

    const sliceFrom = reset ? 0 : visibleCount;
    const next = currentList.slice(sliceFrom, sliceFrom + PAGE_SIZE);

    if (reset) {
        grid.style.opacity = "0";
        grid.style.transform = "translateY(6px)";

        setTimeout(() => {
            visibleCount = next.length;
            grid.innerHTML = buildHTML(next, false);

            requestAnimationFrame(() => {
                grid.style.opacity = "1";
                grid.style.transform = "translateY(0)";
            });

            updateLoadMoreButton();
        }, 250);

        return;
    }

    const html = buildHTML(next, true);
    grid.insertAdjacentHTML("beforeend", html);

    const newItems = grid.querySelectorAll(".inspire-item.is-enter");
    newItems.forEach((item) => {
        requestAnimationFrame(() => {
            item.classList.add("is-enter-active");
        });
    });

    visibleCount += next.length;
    updateLoadMoreButton();
}

tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
        tabs.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        render(btn.dataset.cat, true);
    });
});

loadMoreBtn.addEventListener("click", () => {
    render(currentCat, false);
});

grid.style.transition = "opacity 0.25s ease, transform 0.25s ease";
render("all", true);