var app = new function(){
    this.el = document.getElementById("tasks");
    this.title=[];      // "제목"을 저장할 title list
    this.contents=[];   // "내용"을 저장할 contents list

    this.FetchAll = function(){     // Memo list 아래의 내용을 편집하는 함수
        var data = '';      // innerHTML을 하기 전 data변수에 먼저 저장한다.

        if(this.title.length > 0){
            for(i = 0; i < this.title.length; i++){
                data += '<div class="card-body">'   // card 생성
                data += '<h5 class="card-title">'+this.title[i]+'</h5>';    // Add함수에서 title리스트에 넣었던 요소 받아오기
                data += '<p>' + this.contents[i] + '</p>';                  // contents리스트에 넣었던 요소 받아오기
                data += '<div class="btn-group" role="group">'              // 버튼 그룹 생성
                data += '<button onclick="app.Edit('+ i +')" class="btn btn-secondary">Edit</button>';  // Edit함수 호출, 몇번째 메모인지 i로 식별
                data += '<button onclick="app.Delete('+ i +')" class="btn btn-light">Delete</button>';  // Delete함수 호출, 몇번째 메모인지 i로 식별
                data += '</div></div>';
            }
        }

        return this.el.innerHTML = data;
    };

    this.Add = function(){
        el1 = document.getElementById('memo-title')     // "제목"을 받아서 저장하는 el1
        el2 = document.getElementById('memo-contents')  // "내용"을 받아서 저장하는 el2
        var task1 = el1.value;  // "제목"란에 작성한 내용을 받아 task1에 넣는다.
        var task2 = el2.value;  // "내용"란에 작성한 내용을 받아 task2에 넣는다.
        if (task1) {            // "제목"에 무언가 써있으면
            this.title.push(task1.trim());   // "제목"은 title리스트에 넣기, trim() 함수는 양옆 공백 없애기
            this.contents.push(task2.trim());// "내용"은 contents리스트에 넣기
            el1.value = '';     // 기존칸은 빈칸으로 만든다.
            el2.value = '';
            this.FetchAll();
        }
    };
    
    this.Edit = function(item){
        var el1 = document.getElementById('edit-title');        // index.html에서 id 값이 edit-title인 값 받아오기
        var el2 = document.getElementById('edit-contents');
        el1.value = this.title[item];       // 기존에 써있던 "제목" input text에 그대로 입력
        el2.value = this.contents[item];    // 기존에 써있던 "내용" textarea에 그대로 입력
        document.getElementById('edit-box').style.display = 'block';    // display 'block'은 크기에 맞게 일렬에 배치하란 뜻
        self = this;

        document.getElementById('save-edit').onsubmit = function() {    // Edit요소의 "저장" 버튼을 눌렀을때 type="submit" 이므로 onsubmit으로 받아온다.
            var task1 = el1.value;
            var task2 = el2.value;
            if(task1){
                self.title.splice(item, 1, task1.trim());       // splice함수로 1번째 요소의 value값을 새로 받아온 tast1로 대체한다.
                self.contents.splice(item, 1, task2.trim());
                self.FetchAll();
                CloseInput();
            }
        }
    };

    this.Delete = function(item){
        this.title.splice(item, 1)  // 대체하는 것 없이 다음 인덱스를 끌어와 삭제한다.
        this.FetchAll()

    };

}

app.FetchAll();

function CloseInput(){      // 수정 대화창을 끄는용도
    document.getElementById("edit-box").style.display = 'none'; // display 'none'을 이용해 사라지게 한다. 자리차지 x
}