// const pagemanage = document.getElementsByClassName("pagemanage");
// const privious = document.getElementById("Previous");
// // const currentPrevious = document.getElementById("currentPrevious");
// const current = document.getElementById("current");
// // const currentNext = document.getElementById("currentNext");
// const Next = document.getElementById("Next");
// privious.classList.add("hidden");
// // currentPrevious.classList.add("hidden");


// // let select = document.getElementById('select');
// // select.innerHTML = "<option selected>Document</option>";


// // window.addEventListener("load", async (event) => {
// //   debugger;

// //   const users = await axios.get('/getPagintion')
// // 	users.data.Result.filter(x => (x._id != "6210d0e1ab6574603b2ad791") && (x.userverification != false)).map(x => {
// // 		return select.innerHTML += `<option value="${x.username}"> ${x.username}</option>`
// // 	})
// // 	display();
// // });

// // async function display() {
// // 	const statusvalue = $('input[name="flexRadioDefault"]:checked').val();
// // 	const value = statusvalue.split(" ")[2];
// // 	pagination(0, value);
// // };

// for (i = 0; i < pagemanage.length; i++) {
//   pagemanage[i].addEventListener("click", async function (event) {
//     event.preventDefault();
//     let page;
//     if (this.innerText != "Previous" && this.innerText != "Next") {
//       page = this.innerText - 1;
//     } else {
//       page = current.innerText;
//     }
//     await paginationPage(page);
//   });
// }

// async function paginationPage(page) {
//   debugger;

//   const size = 5;

//   let response = await axios.get(`/getPagintion?page=${page}&size=${size}`);

//   console.log(response);

//   let users = response.data.data.docs;

//   show(users);

//   let Result = users;

//   current.innerHTML = Result;
//   if (Result.hasNextPage) {
//     current.classList.remove("hidden");
//     Next.classList.remove("hidden");
//     current.innerHTML = Result.nextPage;
//   }
//   if (!Result.hasNextPage) {
//     current.classList.add("hidden");
//     Next.classList.add("hidden");
//     current.innerHTML = Result.nextPage;
//   }
//   if (!Result.hasPrevPage) {
//     privious.classList.add("hidden");
//   }
//   if (Result.hasPrevPage) {
//     privious.classList.remove("hidden");
//     privious.innerHTML = Result.prevPage;
//   }
// }

// const show = (users) => {
//   debugger;
//   // const Result = users.data;
//   let html = " ";
//   for (let i = 0; i < users.length; i++) {
//     if (users.length) {
//       html += `<tr>
//         <td>${users[i].fristName}</td>
//         <td>${users[i].lastName}</td>
//         <td>${users[i].email}</td>
//         <td>${users[i].phone}</td>
//         <td>
//         <div class="d-flex" >
//         <td>
//         <a href="/delete/('${users[i].id}')" class="btn btn-danger">Delete</a>
//         <a href="/update/('${users[i].id}')" class="btn btn-primary">Edit</a>
//         </td>
//         </div>
//         </td>
//         </tr>`;
//     }
//   }
// };
