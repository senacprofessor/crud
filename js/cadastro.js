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
                render: function(data,type,row){
                    return `<button data-acao='update' data-id='${data.id}' class="btn btn-info btn-xs">Editar</button> 
                    <button data-acao='delete' data-id='${data.id}' class="btn btn-danger btn-xs">Excluir</button>`
                }
            }
        ],
        columnDefs:[
            {
                targets: 0,
                width: "30px"
            },
            {
                targets:2,
                width: "30px"
            },
            {
                targets:3,
                className: "text-right"
            }
        ],
        language:{
            url:"https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Portuguese.json"
           
        }
    });
    

    $('#tabelacadastro tbody').on('click','button',function(){
       let data = tabela.row($(this).parents('tr')).data();
       let acao = $(this).data('acao');
       $('#cadastrar').attr('data-id',data.id);

       if(acao =='update')
       {
           $('#cadastrar').text('ALTERAR');
           $('#cadastrar').attr('data-acao','update');
           $('#nome').val(data.nome);
           $('#sexo').val(data.sexo);
       }
       else if(acao == 'delete')
       {
           $('#idexcluir').text(data.id);
           $('#idexcluir').attr('value',data.id);
           $('#nomeexcluir').text(data.nome);
           $('#sexoexcluir').text(data.sexo);
           $('#exampleModal').modal('show');
       }


    })

    $('#cadastrar').on('click',function(){
        let _type;
        let _data;
        var _nome = $('#nome').val();
        var _sexo = $('#sexo option:selected').val();
        let acao = $(this).attr('data-acao');
        let _id = $(this).attr('data-id');
        let url_url;

        if(acao == 'update')
        {
            _type = 'PUT';
            _data = {id: _id, nome: _nome, sexo:_sexo};
            url_url = `${_url}/${_id}`;

        }
        else if(acao == 'delete')
        {
            _type = "DELETE";
        }
        else if(acao == 'insert')
        {
            _type = "POST";
            _data = { nome: _nome, sexo:_sexo};
            url_url = _url;
        }

        $.ajax({
            type:_type,
            url: url_url,
            dataType:"json",
            data: _data,
            success: function(data){
                console.log(data);

                if(data.id != null)
                {
                    tabela.ajax.reload();
                    $('#nome').val('');
                    $('#sexo').val('M');
                    $('#cadastrar').text('CADASTRAR');
                    $('#cadastrar').attr('data-acao','insert');
                    $.notify('Cadastro realizado com sucesso!',{type:"success"});
                   
                }
               
            },
            error:function(error){
                console.log(error)
            }
        })
    })

    $('#btnExcluir').on("click",function(){
        let id = $('#idexcluir').attr('value');

        $.ajax({
            type: "DELETE",
            url: `${_url}/${id}`,
            dataType : "json",
            success:function(data){
                tabela.ajax.reload();
                $('#exampleModal').modal('hide');
            },
            error:function(erro){
                console.log('Errou')
            }
        })
    })
})