export const vendors = [
    { "title": "Newegg" },
    { "title": "Platinum Micro" },
]

export const attributes = [
    {
        "title": "Color",
        "keyname": "color",
        "type": "color",
        "group": "textile",
        "options": [
            { "title": "White", "value": "white", "color": "#ff", "image": "" },
            { "title": "Black", "value": "black", "color": "#000", "image": "" }
        ],
    },
    {
        "title": "Size",
        "keyname": "size",
        "type": "text",
        "group": "textile",
        "options": [
            { "title": "XXS", "value": "xxs" },
            { "title": "XS", "value": "xs" },
            { "title": "S", "value": "s" },
            { "title": "M", "value": "m" },
            { "title": "L", "value": "l" },
            { "title": "XL", "value": "xl" },
            { "title": "2XL", "value": "2xl" },
            { "title": "3XL", "value": "3xl" },
        ]
    },
    {
        "title": "Storage Sizes",
        "id": "storage_size",
        "group": "electronics",
        "options": [
            { "title": "1 TB", "value": "1tb" },
            { "title": "2 TB", "value": "2tb" }
        ],
    },
    {
        "title": "Memory Sizes",
        "id": "memory_size",
        "group": "electronics",
        "options": [
            { "title": "4 GB", "value": "4gb" },
            { "title": "8 GB", "value": "8gb" }
        ],
    },
]

export const products = [{
    "title": "T Shirt",
    "description": "V neck",
    "group": "textile",
    "price": [
        {
            "stocks": [
                { "vendorID": "newegg", "price": 30, "quantity": 10, "sku": "sadfasd324234", "image": "", "unit": "pc", },
                { "vendorID": "aaawave", "price": 35, "quantity": 5, "sku": "dfahrtgyrt34", "image": "", "unit": "lot" },
            ]
        }
    ],
},
{
    "title": "Blazer",
    "description": "O neck",
    "group": "textile",
    "attributes": ["attributeID1", "attributeID2"],
    "price": [
        {
            "selector": { "color": "white", "size": "xs" },
            "stocks": [
                { "vendorID": "newegg", "price": 30, "quantity": 10, "sku": "sadfasd324234", "image": "", "unit": "pc", },
                { "vendorID": "aaawave", "price": 35, "quantity": 5, "sku": "dfahrtgyrt34", "image": "", "unit": "lot" },
            ]
        },
        {
            "selector": { "color": "black", "size": "xl" },
            "stocks": [
                { "vendorID": "newegg", "price": 30, "quantity": 10, "sku": "ergtgvdg", "image": "", "unit": "pc", },
                { "vendorID": "aaawave", "price": 30, "quantity": 10, "sku": "cvdfdf", "image": "" },
            ]
        },
    ]
}]

export const color_array = [
    { "title": "White", "value": "white" },
    { "title": "Black", "value": "black" }
]
export const size_array = [
    { "title": "XXS", "value": "xxs" },
    { "title": "XS", "value": "xs" },
    { "title": "S", "value": "s" },
    { "title": "M", "value": "m" },
    { "title": "L", "value": "l" },
    { "title": "XL", "value": "xl" },
    { "title": "2XL", "value": "2xl" },
    { "title": "3XL", "value": "3xl" },
]
export const memory_array = [
    { "title": "1 TB", "value": "1tb" },
    { "title": "2 TB", "value": "2tb" }
]

export const option1_array = [
    { "title": "4U, 12 Hot Swap Bays", "value": "4u12b" },
    { "title": "4U, 15 Bays & 8 Fans", "value": "4u15b8f" },
    { "title": "4U, 8 Bays & 2 Fans", "value": "4u8b2f" },
    { "title": "4U, 8 Bays & 4 Fans", "value": "4u8b4f" },
    { "title": "4U, 8 Bays & 7 Fans", "value": "4u8b7f" },
    { "title": "4U, 9 Bays & 3 Fans", "value": "4u9b3f" },
]
export const option2_array = [
    { "title": "USB 2.0", "value": "usb2" },
    { "title": "USB 3.0", "value": "usb3" },
]
