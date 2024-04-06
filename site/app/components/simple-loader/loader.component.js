import loader from './loader.svg';

export const SimpleLoaderComponent = ()=>{
    return`
    <article class="content-wrapper">
        <img class="loader-img" src="${loader}" alt="Loading..."/>
    </article>
    `
}