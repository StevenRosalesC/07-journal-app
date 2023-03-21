// export const myAction= (state) => {
    
// }


export const setEntries= (state,entries) => {
    state.entries = [...state.entries,...entries];// este codigo es para que no se repitan los datos
    state.isLoading = false;


}

export const updateEntry= (state,entry) => {
    const index = state.entries.findIndex(item => item.id == entry.id);
    state.entries[index] = entry;
    
}

export const addEntry= (state,entry) => {
    state.entries=[entry,...state.entries]; 
}

export const deleteEntry= (state,id) => {
    state.entries = state.entries.filter(entry => entry.id != id);

}


