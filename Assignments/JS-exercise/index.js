// Ques 1
/* Write a function to render the following pattern in the console:
* * * * *
* * * *
* * *
* * 
*
The function needs to take a number as a parameter which represents how many asterisks are rendered on the first row.
*/

(function () {
    for (let i = 5; i > 0; i--) {
        console.log("* ".repeat(i))
    }
})();


//Ques 2
/*
Define an object containing information about yourself. The object needs to include 'name', 'address', 'emails', 'interests' and 'education'. The 'education' key needs to be an array of objects containing keys 'name' and 'enrolledDate'.

Using the object defined previously iterate over the 'education' key and print a list of output in the console as follows:
Name: ABC School of Schoolery, Date: 2000
Name: BCD School of Trickery, Date: 2006
*/

const user = {
    name: "Saajan Shrestha",
    address: "Basundhara",
    emails: "saajan@test.com",
    interests: "Nothing",
    education: [
        {
            name: "ABC School of Schoolery",
            enrolledDate: "2000"
        },
        {
            name: "BCD School of Trickery",
            enrolledDate: "2006"
        }
    ]
}

for (let edu of user.education) {
    console.log(`Name: ${edu.name}, Date: ${edu.enrolledDate}`)
}


//Ques 3
/*
Write a function that searches for an object by a specific key value in an array of objects:
var fruits = [
    {id: 1, name: 'Banana', color: 'Yellow'},
    {id: 2, name: 'Apple', color: 'Red'}
]

searchByName(fruits, 'apple');
Should return: {id: 2, name: 'Apple', color: 'Red'}

Also try searchByKey(fruits, 'name', 'apple');
*/

const searchByName = (arr, value) => {
    for (let i of arr) {
        for (let key in i) {
            if (i[key].toString().toUpperCase() == value.toString().toUpperCase()) {
                return i
            }
        }
    }
}

const searchByKey = (arr, key, value) => {
    for (let i of arr) {
        if (i[key].toString().toUpperCase() == value.toString().toUpperCase())  {
            return i
        }
    }
}


var fruits = [
    { id: 1, name: 'Banana', color: 'Yellow' },
    { id: 2, name: 'Apple', color: 'Red' }
]

console.log("Search by name: ", searchByName(fruits, 'apple'))

console.log("Search by key: ", searchByKey(fruits, 'name', 'apple'))

//Ques 4
/*
Write a function that transforms an array of inputs into a new array based on a provided transformation function.
var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) { …TODO }

var output = transform(numbers, function(num) {
    return num * 2;
});
// output should be [2, 4, 6, 8]
*/

var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
    let transform_array = []
    for (let i of collection) {
        transform_array.push(tranFunc(i))
    }
    return transform_array
}

var output = transform(numbers, function (num) {
    return num * 2;
});

console.log("Transformation: ", output)

//Ques 5
/*
Write a program to sort an array of object by a target key. The original array should remain unchanged.
var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key) {
    ...
}

var sorted = sortBy(arr, 'name');
*/

var arr = [{
    id: 1,
    name: 'John',
}, {
    id: 2,
    name: 'Mary',
}, {
    id: 3,
    name: 'Andrew',
}];

function sortBy(array, key) {
    let temp = [array[0]]
    for (let i = 1; i < array.length; i++) {
        let objectToSort = array[i]
        for (let j = 0; j < temp.length; j++) {
            if (temp[j][key] > objectToSort[key]) {
                swapTemp = objectToSort
                objectToSort = temp[j]
                temp[j] = swapTemp
            }
        }
        temp.push(objectToSort)
    }

    return temp
}

var sorted = sortBy(arr, 'name');

console.log("Sorting: ",sorted)

//Ques 6
/* 
Write a program to normalize a given input to get the expected output.
// From this
var input = {
    '1': {
    id: 1,
    name: 'John',
    children: [
        { id: 2, name: 'Sally' },
        { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
    ]
},
'5': {
    id: 5,
    name: 'Mike',
    children: [{ id: 6, name: 'Peter' }]
}
};

// To this
var output = {
    '1': { id: 1, name: 'John', children: [2, 3] },
    '2': { id: 2, name: 'Sally' },
    '3': { id: 3, name: 'Mark', children: [4] },
    '4': { id: 4, name: 'Harry' },
    '5': { id: 5, name: 'Mike', children: [6] },
    '6': { id: 6, name: 'Peter' }
};
*/

var input = {
    '1': {
        id: 1,
        name: 'John',
        children: [
            { id: 2, name: 'Sally' },
            { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
        ]
    },
    '5': {
        id: 5,
        name: 'Mike',
        children: [{ id: 6, name: 'Peter' }]
    }
};


const normalize = (inputObject) => {
    let normalizedObject = {}
    
    const getObjectInformation = (singleObject) => {
        let objInformation = {}
        for (let obj in singleObject){
            if (obj === "children"){
                let childId = []
                for(let child of singleObject[obj]){
                    childId.push(child.id)
                    getObjectInformation(child)
                }
                objInformation[obj] = childId
            }
            else{
                objInformation[obj] = singleObject[obj]
            }
        }
        normalizedObject[singleObject["id"]] = objInformation
    }

    for (let inputKey in inputObject){
        getObjectInformation(inputObject[inputKey])
    }

    return normalizedObject
}

console.log("Normalization: ",normalize(input))
