(function() {
    bind();
    function bind() {
        $('#commit_btn').unbind('click').bind('click', function(){
            commit();
        })
        $('#result_btn').unbind('click').bind('click', function(){
            query();
        })
        $('#post_btn').unbind('click').bind('click', function(){
            toCommitArea();
        })
    }
    function toCommitArea() {
        $('#result_table').hide();
        $('#commit_form').show();
    }
    function commit() {
        var name, id, remark;
        employeeName = $('#employee_name').find('input').val();
        employeeId = $('#employee_id').find('input').val();
        employeeRemark = $('#employee_remark').find('input').val();

        $.ajax({
            type: "post",
            url: "/commit?name=" + employeeName + "&id=" + employeeId + "&remark=" + employeeRemark,
            success: function(data) {
                if(data == "success"){
                    query();
                }
            }
        })
    }

    function query() {
        $('#commit_form').hide()
        $('#result_table').find('tbody').empty();
        $.ajax({
            type: "get",
            url: "/commit",
            success: function(data) {
                console.log(data);
                for(var i = 1; i < data.length; i++) {
                    $('#result_table').show().find('tbody').append(createTR(data[i], i));
                }
            }
        })
    }
    function createTR(info, index) {
        var $tr = $('<tr><th class="th_row" scope="row">1</th><td class="name"></td><td class="id"></td><td class="remark"></td></tr>');
        $tr.find('.th_row').text(index);
        $tr.find('.name').text(info[0]);
        $tr.find('.id').text(info[1]);
        $tr.find('.remark').text(info[2]);
        return $tr;
    }
}())
