// export const myAction= async({commit}) => {
// }
import journalApi from "@/api/journalApi"


export const loadEntries= async({commit}) => {
    const {data} = await journalApi.get("/entries.json");
    if (!data){
        commit('setEntries',[])
        return;
    }
    const entries = [];
    for (let id of Object.keys(data)) {
        console.log(id);
        entries.push({
            id,
            ...data[id]
        });
    }
    console.log(entries);

    commit('setEntries',entries)
}

export const updateEntry= async({commit}, entry) => {
    const {date,picture,text} = entry;
    const dataToSave = {date,picture,text};
    const {data} = await journalApi.put(`/entries/${entry.id}.json`,dataToSave);
    console.log(data);
    commit('updateEntry',{...entry})


}

export const createEntry= async({commit},entry) => {
    const {data} = await journalApi.post(`/entries.json`,entry);
    console.log(data);
    commit('addEntry',{...entry,id:data.name})    
    return data.name;
}

export const deleteEntry= async({commit},id) => {
    const {data} = await journalApi.delete(`/entries/${id}.json`);
    console.log(data);
    commit('deleteEntry',id)
}