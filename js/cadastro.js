$(document).ready(function(){
    const _url = 'http://localhost:3000/alunos';
    let tabela = $('#tabelacadastro').DataTable({
        ajax:{
            url:_url,
            dataSrc:""
        },
        columns:[
            {"data":"id"},
            {"data":"nome"},
            {"data":"sexo"},
            {
                "data":null,
                render: function(data,type, row)
                {
                    return '<button class="btn btn-info btn-xs"><i class="fas fa-pen" sytle="color:red"></i>tttt</button>'
                }
                // defaultContent:'<span><i class="fas fa-pen"></i></span>'
            }
        ],
        columnDefs:[
            {
                targets: 0,
                width: "30px"
            },
            {
                targets:3,
            }
        ],
        language:{
            url:"https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"
           
        }
    });
    
    $('#cadastrar').on('click',function(){
        var nome = $('#nome').val();
        var sexo = $('#sexo option:selected').val();

        $.ajax({
            type:"POST",
            url: `${_url}`,
            dataType:"json",
            data:{nome: nome, sexo: sexo},
            success: function(data){
                if(data.id != null)
                tabela.ajax.reload();
            },
            error:function(data){

            }
        })
    })
})