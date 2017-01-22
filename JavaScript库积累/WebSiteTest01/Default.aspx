<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <img src="DSCN0614_small.jpg" id="img1" />
            <canvas id="canvas"></canvas>
    </div>
    </form>
    <script src="Style/js/libs/dateJs.js"></script>
    <script src="Style/js/libs/stringJs.js"></script>

    <script src="Style/js/libs/canvasJs.js"></script>
    <script>
        var canvas = document.getElementById('canvas');
        var img = document.getElementById('img1');
        window.canvasUtil.rotateImg(img, canvas,a);

        function a(ab) {
            console.log(ab.toDataURL('image/jpeg'));
        }
        

    </script>
</body>
</html>
