import { useState } from 'react';

export function Dropdown({ opts }) {
    function open() { setVisible(true) }
    function close() { setVisible(false) }
    function isOpen() { return visible }

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
                                <div className="flex flex-auto flex-wrap" onClick={() => { isOpen() ? close(): open(); }}>
                                    {
                                        options.filter(o => o.selected).map((option, index) => {
                                            return (
                                                <div className="flex justify-center items-center m-1 font-medium py-1 px-1 bg-white rounded bg-gray-100 border">
                                                    <div className="text-xs font-normal leading-none max-w-full flex-initial">
                                                        {option.title}
                                                    </div>
                                                    <div className="flex flex-auto flex-row-reverse">
                                                        <div onClick={() => { remove(option) }}>X</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="text-gray-300 border-l flex items-center border-gray-200 ">
                                    <button type="button" onClick={() => { open() }} className={(isOpen() ? " hidden " : "") + "cursor-pointer text-gray-600 outline-none focus:outline-none"} >
                                        D
                                    </button>
                                    <button type="button"  onClick={() => { close() }} className={(isOpen() ? "" : " hidden ") + "cursor-pointer text-gray-600 outline-none focus:outline-none"}>
                                        U
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4">
                            <div className={(visible ? "" : " hidden ") + "absolute shadow top-100 bg-white z-40 w-full left-0 rounded max-h-select"} onClick={() => { console.log("closed") }}>
                                <div className="flex flex-col w-full overflow-y-auto h-64">
                                    {options.map((option, index) => {
                                        return (
                                            <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-gray-100" onClick={() => { console.log(option, index); select(option) }} >
                                                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                                                    <div className="w-full items-center flex justify-between">
                                                        <div className="mx-2 leading-6">{option.title}</div>
                                                        <div className={option.selected ? '' : ' hidden '}>
                                                            Tick
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
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
    function loadOptions() {
        const options = document.getElementById('select').options;
        for (let i = 0; i < options.length; i++) {
            this.options.push({
                value: options[i].value,
                text: options[i].innerText,
                selected: options[i].getAttribute('selected') != null ? options[i].getAttribute('selected') : false
            });
        }


    }
    function selectedValues() {
        return this.selected.map((option) => {
            return this.options[option].value;
        })
    }

}
/*
<select x-cloak id="select">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
  <option value="4">Option 4</option>
  <option value="5">Option 5</option>
  <option value="6">Option 6</option>
  <option value="7">Option 7</option>
  <option value="8">Option 8</option>
</select>

<div x-data="dropdown()" x-init="loadOptions()" className="w-full md:w-1/2 flex flex-col items-center h-64 mx-auto">
  <input name="values" type="hidden" x-bind:value="selectedValues()">
  <div className="inline-block relative w-64">
    <div className="flex flex-col items-center relative">
      <div x-on:click="open" className="w-full">
        <div className="my-2 p-1 flex border border-gray-200 bg-white rounded">
          <div className="flex flex-auto flex-wrap">
            <template x-for="(option,index) in selected" :key="options[option].value">
              
            </template>
            <div x-show="selected.length == 0" className="flex-1">
              <input placeholder="Select a option" className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800" x-bind:value="selectedValues()">
            </div>
          </div>
          <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">

            <button type="button" x-show="isOpen() === true" x-on:click="open" className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
              <svg version="1.1" className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M17.418,6.109c0.272-0.268,0.709-0.268,0.979,0s0.271,0.701,0,0.969l-7.908,7.83
    c-0.27,0.268-0.707,0.268-0.979,0l-7.908-7.83c-0.27-0.268-0.27-0.701,0-0.969c0.271-0.268,0.709-0.268,0.979,0L10,13.25
    L17.418,6.109z" />
              </svg>

            </button>
            <button type="button" x-show="isOpen() === false" @click="close" className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M2.582,13.891c-0.272,0.268-0.709,0.268-0.979,0s-0.271-0.701,0-0.969l7.908-7.83
    c0.27-0.268,0.707-0.268,0.979,0l7.908,7.83c0.27,0.268,0.27,0.701,0,0.969c-0.271,0.268-0.709,0.268-0.978,0L10,6.75L2.582,13.891z
    " />
              </svg>

            </button>
          </div>
        </div>
      </div>
      <div className="w-full px-4">
        <div x-show.transition.origin.top="isOpen()" className="absolute shadow top-100 bg-white z-40 w-full left-0 rounded max-h-select" x-on:click.away="close">
          <div className="flex flex-col w-full overflow-y-auto h-64">
            <template x-for="(option,index) in options" :key="option" className="overflow-auto">
              <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-gray-100" @click="select(index,$event)">
                <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative">
                  <div className="w-full items-center flex justify-between">
                    <div className="mx-2 leading-6" x-model="option" x-text="option.text"></div>
                    <div x-show="option.selected">
                      <svg className="svg-icon" viewBox="0 0 20 20">
                        <path fill="none" d="M7.197,16.963H7.195c-0.204,0-0.399-0.083-0.544-0.227l-6.039-6.082c-0.3-0.302-0.297-0.788,0.003-1.087
                            C0.919,9.266,1.404,9.269,1.702,9.57l5.495,5.536L18.221,4.083c0.301-0.301,0.787-0.301,1.087,0c0.301,0.3,0.301,0.787,0,1.087
                            L7.741,16.738C7.596,16.882,7.401,16.963,7.197,16.963z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
*/