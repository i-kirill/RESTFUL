/**
 * Created by User on 30.04.2023.
 */

let id = null;

async function getPosts(){
    let res = await fetch('http://localhost/News_project/posts');
    let posts = await res.json();

    document.querySelector('.post-list').innerHTML = '';

        posts.forEach((post)=>{
        document.querySelector('.post-list').innerHTML += `
    <div class="card" style="...">
            <div class=-"card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.body}</p>
            <a href="#" class="card-link">���������</a>
            <a href="#" class="card-link" onclick="removePost(${post.id})">�������</a>
            <a href="#" class="card-link" onclick="selectPost('${post.id}','${post.title}','${post.body}')">�������������</a>
    `
    })
}


async function addPost(){
const title = document.getElementById('title').value,
 body = document.getElementById('body').value;

    let formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);

    const res = await fetch('http://localhost/News_project/posts', {
        method: 'POST',
        body: formData
    });

    const data = res.json();

    if(data.status === true){
       await getPosts();
    }

}
async function removePost(id){
    const res = await fetch(`http://localhost/News_project/posts/${id}`,{
        method:'DELETE'
    });

    const data = await res.json();

    if (data.status === true){
        await getPosts();
    }
}
function selectPost(id, title, body){
    id = id;
    document.getElementById('title-edit').value = title;
    document.getElementById('body-edit').value = body;
}

async function updatePost(id){
const title =   document.getElementById('title-edit').value;
    const body =  document.getElementById('body-edit').value ;

    const data ={
        title: title,
        body: body

    };
    const res = await fetch(`http://localhost/News_project/posts/${id}`,{
        method:"PATCH",
        body:JSON.stringify(data)
    });


    let resData = res.json();

    if(resData.status === true){
        await getPosts();
    }
}

getPosts();