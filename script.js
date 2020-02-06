//get reference to the elements
const headingEl=document.querySelector("#headingTotal");
const inputAmountEl=document.querySelector("#inputAmount");
const inputDescEl=document.querySelector("#inputDesc");
const expenseTableEl=document.querySelector("#expenseTable");
const element=document.querySelector("#addExpenseBtn");

//initial value of expense at 0
let totalExpense=0;
headingEl.textContent=totalExpense;
renderTotal(totalExpense);

let allExpenses=[];
let newArr=[];

//logic

//onButtonClick add inputAmount to totalExpense
function addExpenseToTotal(){
    //object for storing expenseItems
    const expenseItem={};

    const textAmount=inputAmountEl.value;
    const textDesc=inputDescEl.value;
    const expense=parseInt(textAmount,10);

    //add the value to totalExpense
    totalExpense=totalExpense+expense;
    renderTotal(totalExpense);
    //put it into object
    expenseItem.amount=expense;
    expenseItem.desc=textDesc;
    expenseItem.moment=new Date();

    //store the object in an array
    allExpenses.push(expenseItem);
   
     //store the array in local storage
    // storeData(expenseItem,allExpenses);

     document.querySelector('#inputAmount').value='';
     document.querySelector('#inputDesc').value='';
    //display added items in expenseTable
     renderList(allExpenses);
}

//function to store the data in local storage
/*function storeData(expenseItem){
    newArr.push(expenseItem);
    localStorage.setItem('saved',JSON.stringify(newArr));
    localStorage.setItem('total',totalExpense);
}*/

//listening to click event on add button
element.addEventListener("click",addExpenseToTotal,false);

//get date string
function getDateString(moment){
return moment.toLocaleDateString('en-us',{
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

//Delete items
function deleteItem(dateValue){
    newArr=[];
    allExpenses=allExpenses.filter((expense)=>
    {if(expense.moment.valueOf()!==dateValue){
        return expense;
    }
    });
    newTotal(allExpenses);
    renderList(allExpenses);
    
}

//new total function to display new value of total on deletion of list items
function newTotal(expenses){
let sum=0;
for(let i=0;i<expenses.length;i++){
    sum=sum+allExpenses[i].amount;
}
totalExpense=sum;
renderTotal(sum);
}

//function to render total in nav bar
function renderTotal(totalExpense){
    const someText=`Total : ${totalExpense}`;
     headingEl.textContent=someText;

}

//function to render list items when added
function renderList(arroflist){
    const allExpenseHTML=arroflist.map(expense =>createListItem(expense));
const joinedAllExpenseHTML=allExpenseHTML.join(" ");
    expenseTableEl.innerHTML=joinedAllExpenseHTML;
    
}

//function containing html template for creating individual list items
function createListItem({desc,amount,moment}){
return `
        <li class="mb-2 list-group-item d-flex justify-content-between">
      <div class="d-flex flex-column"> ${desc}
     <small class="text-muted">${getDateString(moment)}</small>
      </div> 
      <div>
      <span class="px-5">${amount}</span>
      <button 
      type="button" 
      class="btn btn-outline-danger btn-sm mr-2"
      onclick="deleteItem(${moment.valueOf()})";
      >
      <i class="fa fa-trash" aria-hidden="true"></i>
      </button>

      </div> 
      
        </li>
`;
}