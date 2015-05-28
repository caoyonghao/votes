(function() {
    bind();
    function bind() {
        $('#commit_btn').unbind('click').bind('click', function(){
            commit();
        })
    }

    function commit() {
        var name, id, remark;
        employeeName = $('#employee_name').find('input').val();
        employeeId = $('#employee_id').find('input').val();
        employeeRemark = $('#employee_remark').find('input').val();

        $.ajax({
            type: "post",
            url: "/commit",
            data: {name: employeeName, id: employeeId, remark: employeeRemark},
            success: function(data) {
                console.log(data);
            }
        })
    }

}())
