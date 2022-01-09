import { useState } from 'react';

export function Dropdown({ opts }) {
	function isOpen() { return visible }
	function toggle() { setVisible(!visible) }

	const [options, setOptions] = useState(opts);
	const [visible, setVisible] = useState(false);
	return (
		<div>
			<div className="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
				<input name="values" type="hidden" value={options.filter(o => o.selected).map(o => o.value)} />
				<div className="inline-block relative w-64">
					<div className="flex flex-col items-center relative">
						<div className="w-full">
							<div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
								<div className="flex flex-auto flex-wrap" onClick={() => { toggle() }}>
									{
										options.filter(o => o.selected).map((option, index) => {
											return (
												<SelectedItem o={option} i={index} onCrossClickCallback={remove}></SelectedItem>
											)
										})
									}
								</div>
								<DropdownButton collapsed={isOpen()} toggleCallback={toggle}></DropdownButton>
							</div>
						</div>
						<div className="w-full px-4">
							<div className={(isOpen() ? "" : " hidden ") + "absolute shadow top-100 bg-white z-40 w-full left-0 rounded max-h-select"}>
								<div className="flex flex-col w-full overflow-y-auto h-64">
									{
										options.map((option, index) => {
											return (
												<DropdownItem o={option} i={index} onClickCallback={select}></DropdownItem>
											)
										})
									}
								</div>
							</div>
						</div>
					</div>

				</div>
			</div >
		</div >
	)
	function select(option) {
		const new_options = options.map((o) => {
			if (o.value == option.value) {
				o.selected = !o.selected;
			}
			return o;
		})
		setOptions(new_options);
	}
	function remove(option) {
		const new_options = options.map((o) => {
			if (o.value == option.value) {
				o.selected = false;
			}
			return o;
		})
		setOptions(new_options);
	}
}

function SelectedItem({ o, i, onCrossClickCallback }) {
	return (
		<div className="flex justify-center items-center m-1 font-medium py-1 px-1 bg-white rounded bg-gray-100 border">
			<div className="text-xs font-normal leading-none max-w-full flex-initial">
				{o.title}
			</div>
			<div className="flex flex-auto flex-row-reverse">
				<div onClick={(e) => { e.stopPropagation(); onCrossClickCallback(o) }}>X</div>
			</div>
		</div>
	)
}
function DropdownItem({ o, i, onClickCallback }) {
	return (
		<div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-gray-100" onClick={() => { onClickCallback(o) }} >
			<div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
				<div className="w-full items-center flex justify-between">
					<div className="mx-2 leading-6">{o.title}</div>
					<div className={o.selected ? '' : ' hidden '}>
						Tick
					</div>
				</div>
			</div>
		</div>
	)
}
function DropdownButton({ collapsed, toggleCallback }) {
	return (
		<div className="text-gray-300 border-l flex items-center border-gray-200 ">
			<button type="button" onClick={() => { toggleCallback() }} className={(collapsed ? " hidden " : "") + "cursor-pointer text-gray-600 outline-none focus:outline-none"} >
				D
			</button>
			<button type="button" onClick={() => { toggleCallback() }} className={(collapsed ? "" : " hidden ") + "cursor-pointer text-gray-600 outline-none focus:outline-none"}>
				U
			</button>
		</div>
	)
}