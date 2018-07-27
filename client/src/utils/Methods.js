import API from "./API";

export default {

  ApiCalls: function () {
    // Takes the array of selected tags and reverts them to lowercase to match values in the database
    const sort = this.state.selectedTags.map(word => word.toLowerCase());
    // Checks if user has selected any tags and any checkpoints (Utilizes the tags and cp API route)
    if(this.state.selectedTags.length > 0 && this.state.selectedCP.length > 0 ) 
      API.getQuestionsByCpNumAndSubject(this.state.selectedCP.join("+"), sort.join("+")) // Joins selections by plus sign for compatability with routes
        .then(res => {
          console.log(res.data);
          this.setState({
            // Passes array of results into the state
            arrayOfQuestions: res.data,
            // Uses state to prevent flashcard from loading before response from API received
            apiLoaded: true,
          });
          // console.log(this.state.apiLoaded)
        }).catch(err => {
          console.log(err);
        });
    // Else if that is activated if user only selects Checkpoints for sorting
    else if (this.state.selectedCP.length > 0) 
      API.getQuestionsByCpNumber(this.state.selectedCP.join("+"))
        .then(res => {

          this.setState({
            arrayOfQuestions: res.data[0].quiz.questions,
            cpName: res.data[0].quiz.title,
            apiLoaded: true,
          });
        }).catch(err => {
          console.log(err);
        });
    // Else if that is activated if user only selects Tags for sorting
    else if (this.state.selectedTags.length > 0) 
      API.getQuestionsBySubject(sort.join("+"))
        .then(res => {
          console.log(res);
          this.setState({
            arrayOfQuestions: res.data,
            apiLoaded: true,
          });
        }).catch(err => {
          console.log(err);
        });
    else 
    // Grabs all of the available questions from the database, currently only is called if the user presses start with no selections made
      API.getCheckpoints()
        .then(res => {
          console.log(res);
          this.setState({
            arrayOfQuestions: res.data[0].quiz.questions,
            cpName: res.data[0].quiz.title,
            apiLoaded: true,
          });
        }).catch(err => {
          console.log(err);
        });
        
  },

};