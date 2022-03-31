var app = new function(){
    this.el = document.getElementById("tasks");
    this.title=[];
    this.contents=[];

    this.FetchAll = function(){
        var data = '';

        if(this.title.length > 0){
            for(i = 0; i < this.title.length; i++){
                // data += '<div class="card">';
                data += '<div class="card-body">'
                data += '<h5 class="card-title">'+(i+1)+'. '+this.title[i]+'</h5>';
                data += '<p>' + this.contents[i] + '</p>';
                data += '<button onclick="app.Edit('+i+')" class="btn btn-warning">Edit</button>';
                data += '<button onclick="app.Delete('+i+')" class="btn btn-danger">Delete</button>';
                data += '</div>';
                // data += '</tr>';
            }
        }

        return this.el.innerHTML = data;
    };

    this.Add = function(){
        el1 = document.getElementById('add-memo')
        el2 = document.getElementById('add-word')
        var task1 = el1.value;
        var task2 = el2.value;
        if (task1) {
            this.title.push(task1.trim());   // trim() 함수는 양옆 공백 없애기
            this.contents.push(task2.trim());
            el1.value = '';
            el2.value = '';
            this.FetchAll();
        }
    };
    
    this.Edit = function(item){
        var el = document.getElementById('edit-todo');
        el.value = this.title[item];
        document.getElementById('edit-box').style.display = 'block';
        self = this;

        document.getElementById('save-edit').onsubmit = function() {
            var task = el.value;
            if(task){
                self.title.splice(item, 1, task.trim());
                self.FetchAll();
                CloseInput();
            }
        }
    };

    this.Delete = function(item){
        this.title.splice(item, 1)
        this.FetchAll()

    };

}

app.FetchAll();

function CloseInput(){
    document.getElementById("edit-box").style.display = 'none';
}