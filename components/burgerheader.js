export default function BurgerHeader() {
    return <div className="flex items-center lg:hidden w-full bg-light border-b border-gray-300 py-4 px-6 sticky top-[55px] z-10">
        <div className="w-16 h-16 rounded-lg relative mx-auto border border-gray-100 bg-gray-200 overflow-hidden me-4 flex-shrink-0">
            <div stylez="display: block; overflow: hidden; position: absolute; inset: 0px; box-sizing: border-box; margin: 0px;">
                <img alt="logo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" decoding="async" data-nimg="fill" stylez="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;" />
                <noscript></noscript>
            </div>
        </div>
        <div className="w-full">
            <h3 className="text-base font-semibold text-heading">Furniture Shop</h3>
            <button className="text-sm font-semibold transition text-accent hover:text-accent-hover">More Info</button>
        </div>
    </div>;
}