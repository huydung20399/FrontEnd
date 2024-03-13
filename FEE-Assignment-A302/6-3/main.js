$(document).ready(function() {
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

    const itemsContainer = $('.card-columns');

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
        itemsContainer.append(cardHTML);
    });

    const btnFilters = $('.btn-filter');
    const searchForm = $("#searchForm");

    // Filter items based on category
    function filterItems(category) {
        $('.card').each(function() {
            const itemName = $(this).find('.item-name').text().toLowerCase();
            if (category === 'all' || itemName.includes(category.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    // Event listener for filter buttons
    btnFilters.click(function() {
        const category = $(this).data('filter');
        filterItems(category);
    });

    // Filter items based on search input
    searchForm.submit(function(event) {
        event.preventDefault(); // Prevent form submission
        const searchValue = $("#item").val().trim().toLowerCase();
        filterItems(searchValue);
    });
});
