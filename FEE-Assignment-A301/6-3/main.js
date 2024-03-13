// document.addEventListener('DOMContentLoaded', function () {
//     const itemsContainer = document.getElementById("itemsContainer");
//     const btnFilters = document.querySelectorAll('.btn-filter');
//     const searchForm = document.getElementById("searchForm");
//
//     // Filter items based on category
//     function filterItems(category) {
//         const cards = itemsContainer.querySelectorAll('.card');
//         cards.forEach(card => {
//             if (category === 'all' || card.classList.contains(category)) {
//                 card.style.display = 'block';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     }
//
//     // Event listener for filter buttons
//     btnFilters.forEach(btn => {
//         btn.addEventListener('click', () => {
//             const category = btn.getAttribute('data-filter');
//             filterItems(category);
//         });
//     });
//
//     // Filter items based on search input
//     searchForm.addEventListener('submit', (event) => {
//         event.preventDefault(); // Prevent form submission
//         const searchValue = document.getElementById("item").value.trim().toLowerCase();
//         const cards = itemsContainer.querySelectorAll('.card');
//         cards.forEach(card => {
//             const itemName = card.querySelector('.card-text').textContent.toLowerCase();
//             if (itemName.includes(searchValue)) {
//                 card.style.display = 'block';
//             } else {
//                 card.style.display = 'none';
//             }
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    // Mảng chứa các đối tượng thông tin sản phẩm
    const items = [
        {
            image: "image/cake1.png",
            name: "Sweet item",
            price: "5$"
        },
        {
            image: "image/cake4.png",
            name: "Doughnut item",
            price: "5$"
        },
        {
            image: "image/cake2.png",
            name: "Cupcake item",
            price: "5$"
        },
        {
            image: "image/cake5.png",
            name: "Sweet item",
            price: "10$"
        },
        {
            image: "image/cake3.png",
            name: "Cake item",
            price: "5$"
        },
        {
            image: "image/cake6.png",
            name: "Cupcake item",
            price: "10$"
        }
    ];

    // Lặp qua mảng và hiển thị các sản phẩm
    // const itemsContainer = document.querySelector('.card-columns');
    // items.forEach(item => {
    //     const card = document.createElement('div');
    //     card.classList.add('card', 'bg-light');
    //
    //     const img = document.createElement('img');
    //     img.src = item.image;
    //     img.alt = item.name;
    //
    //     const cardBody = document.createElement('div');
    //     cardBody.classList.add('card-body', 'text-center');
    //
    //     const cardText = document.createElement('p');
    //     cardText.classList.add('card-text');
    //
    //     const itemName = document.createElement('span');
    //     itemName.classList.add('item-name');
    //     itemName.textContent = item.name;
    //
    //     const itemPrice = document.createElement('span');
    //     itemPrice.classList.add('price');
    //     itemPrice.textContent = item.price;
    //
    //     cardText.appendChild(itemName);
    //     cardText.appendChild(itemPrice);
    //
    //     cardBody.appendChild(cardText);
    //
    //     card.appendChild(img);
    //     card.appendChild(cardBody);
    //
    //     itemsContainer.appendChild(card);
    // });

    const itemsContainer = document.querySelector('.card-columns');

    items.forEach(item => {
        const cardHTML = `
            <div class="card bg-light">
                <img src="${item.image}" alt="${item.name}">
                <div class="card-body text-center">
                    <p class="card-text">
                        <span class="item-name">${item.name}</span>
                        <span class="price">${item.price}</span>
                    </p>
                </div>
            </div>
        `;
        itemsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const itemsContainer = document.querySelector('.card-columns');
    const btnFilters = document.querySelectorAll('.btn-filter');
    const searchForm = document.getElementById("searchForm");

    // Filter items based on category
    function filterItems(category) {
        const cards = itemsContainer.querySelectorAll('.card');
        cards.forEach(card => {
            const itemName = card.querySelector('.item-name').textContent.toLowerCase();
            if (category === 'all' || itemName.includes(category.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event listener for filter buttons
    btnFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-filter');
            filterItems(category);
        });
    });

    // Filter items based on search input
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission
        const searchValue = document.getElementById("item").value.trim().toLowerCase();
        filterItems(searchValue);
    });
});