const { default: profileReducer, addPostActionCreator, deletePostActionCreator } = require("./profile-reducer");

let state = {
    postsData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 0},
        {id: 2, message: 'It\'s my post', likesCount: 12},
    ],
};

it('message of new post posts should be correct', () => {
    // 1. test data
    let action = addPostActionCreator("it-incubator.com");
    // 2. action
    let newState = profileReducer(state , action);

    // 3. expectation
    expect(newState.postsData.length).toBe(3);
});

it('length of posts should be increment', () => {
    // 1. test data
    let action = addPostActionCreator("it-incubator.com");
    // 2. action
    let newState = profileReducer(state , action);

    // 3. expectation
    expect(newState.postsData[2].message).toBe("it-incubator.com");
});

it('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = deletePostActionCreator(1);
    // 2. action
    let newState = profileReducer(state , action);

    // 3. expectation
    expect(newState.postsData.length).toBe(2);
});

it("after deleting length of messages shouldn't be decrement if id is incorrect", () => {
    // 1. test data
    let action = deletePostActionCreator(1000);
    // 2. action
    let newState = profileReducer(state , action);

    // 3. expectation
    expect(newState.postsData.length).toBe(2);
});

