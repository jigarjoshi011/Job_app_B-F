document.getElementById("addEdu").addEventListener('click', () => {
    document.getElementById('field7').insertAdjacentHTML('beforeend', ` <div class="edu">
    <div>
        <label>Name of Course</label>
        <select class="cc" name="Course" id="Course">
        <% for(var i=0 ; i< Course.length;i++){ %>
            <option value="<%= Course[i].option_value %>">
                <%= Course[i].option_value %>
            </option>
            <% } %>
    </select>
    </div>
    <div>
        <label>Board/University</label>
        <input type="text" name="institution" id="institution">
    </div>
    <div>
        <label>Percentage Obtained</label>
        <input type="text" name="Percentage" id="Percentage">
    </div>
    <div>
        <label>Passing Year</label>
        <input type="text" name="Passing_Year" id="Passing_Year">
    </div><br><br><br>
</div>`)
})

document.getElementById('addExp').addEventListener('click', () => {
    document.getElementById('field8').insertAdjacentHTML('beforeend', `<div class="Work">
    <div>
        <label>Name of company</label>
        <input type="text" name="company" id="company">
    </div>
    <div>
        <label>Designation</label>
        <input type="text" name="Designation" id="Designation">
    </div>
    <div>
        <label>From</label>
        <input type="date" name="start_date" id="start_date">
    </div>
    <div>
        <label>To</label>
        <input type="date" name="end_date" id="end_date">
    </div>
</div><br><br>`)
})

function addLangaugeCard() {
    let lang_name = prompt("Enter Language Name");
    if(lang_name==null){
        return null
    }
    var lang_card = document.getElementById("lang_info");
    var create_div = document.createElement("div");
    var content = `
    <div id="lang_cols" class="lk1">
        <input type="checkbox" name="lang_name" id="${lang_name}" value="${lang_name}">
        <label for="lang_hindi">${lang_name}</label>
        <input type="checkbox" name="lang_read" id="${lang_name}_read" value="read">
        <label for="lang_read">Read</label>
        <input type="checkbox" name="lang_speak" id="${lang_name}_speak" value="speak">
        <label for="lang_speak">Speak</label>
        <input type="checkbox" name="lang_write" id="${lang_name}_write" value="write">
        <label for="lang_write">Write</label>
    </div>
    `;

    create_div.innerHTML = content;
    lang_card.appendChild(create_div);
}
// addLangaugeCard();


// document.getElementById('addtk').addEventListener('click', () => {
//     document.getElementById('tkid').insertAdjacentHTML('afterend', `     <div class="tk1">
//         <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
//         <label for="vehicle1"> I have a bike</label><br>
//         <input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
//         <label for="vehicle2"> I have a car</label><br>
//         <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat">
//         <label for="vehicle3"> I have a boat</label><br>

//     </div>`)
// })


function addTechnologyCard(){
    let Tech_name = prompt("Enter Language Name");
    if(Tech_name==null){
        return null;
    }
    var Tech_card = document.getElementById("Tech_info");
    var create_div = document.createElement("div");
    var content = `
    <div id="lang_cols" class="tk1">
        <input type="checkbox" name="Tech_name" id="${Tech_name}" value="${Tech_name}">
        <label for="lang_hindi">${Tech_name}</label>
        <input type="radio" name="Bignner" id="Bignner" value="Bignner">
        <label for="lang_read">Bignner</label>
        <input type="radio" name="intermediate" id="intermediate" value="intermediate">
        <label for="lang_speak">intermediate</label>
        <input type="radio" name="Expert" id="Expert" value="Expert">
        <label for="lang_write">Expert</label>
    </div>
    `;

    create_div.innerHTML = content;
    Tech_card.appendChild(create_div);
}








document.getElementById("ref_contact").addEventListener('click', () => {
    document.getElementById('field10').insertAdjacentHTML('beforeend', `            <div class="ref">
    <div>
        <label>Name</label>
        <input type="text" name="ref_name" id="ref_name">
    </div>
    <div>
        <label>Email</label>
        <input type="text" name="ref_email" id="ref_email">
    </div>
    <div>
        <label>Relation</label>
        <input type="text" name="Relation" id="Relation">
    </div>
</div><br><br>`)
})



let value_Of_Edu = document.getElementById("#field7")

console.log(value_Of_Edu);