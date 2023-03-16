export default ()=>({
    isLoading: false, 
    entries: [
    {
        date: new Date().toDateString(), // 'Mon Sep 13 2021'
        id: new Date().getTime(), // 1234567890
        picture: null,
        text: 'In officia duis amet reprehenderit laborum mollit in eu sunt sunt cupidatat nostrud labore aliqua.',
    },
    {
        date: new Date().toDateString()+1, // 'Mon Sep 13 2021'
        id: new Date().getTime(), // 1234567890
        picture: null,
        text: 'Dolore aute deserunt aliquip elit sint non ipsum ad.',
    },
    {
        date: new Date().toDateString()+2, // 'Mon Sep 13 2021'
        id: new Date().getTime(), // 1234567890
        picture: null,
        text: 'Cillum in aliqua cillum voluptate occaecat minim pariatur ea reprehenderit anim dolor elit ea ut.',
    },
],
})