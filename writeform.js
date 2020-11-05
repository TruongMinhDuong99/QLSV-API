const { Console } = require('console');
const fs = require('fs');
function PageQLSV(res) {
    let data = fs.readFileSync('Views/QuanLySinhVien.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }

  function CreateForm(res) {
    let data = fs.readFileSync('Views/createForm.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
  }
  function writeEditForm(HoTen, NgaySinh,Avata,res) {
    let data = fs.readFileSync('Views/editForm.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    data = insertHoTen(data, HoTen);
    data=insertNgaySinh(data,NgaySinh);
    data=insertAvata(data,Avata);
    res.write(data);
  }
  function writeItemTable(obj, res) {
    res.write('<table class="table table-striped table-bordered table-list" border="1px solid black" style="margin-left:250px;width:80%;"><thead> <tr><th style="width:auto;">MSSV</th> <th>Họ tên</th><th style="width:auto;">Ngày sinh</th><th style="width:auto;">Avata</th></tr></thead> ');
    if (obj.err) {
      res.write(`<h5 style="color:red;">Error:: ${obj.err}</h5>`);
      res.write('<tr><td colspan="5">Nothing to show</td></tr>');
    } else {
      if (obj.data.Items.length === 0) {
        res.write('<tr><td colspan="5">Nothing to show</td></tr>');
      }
      obj.data.Items.forEach((user) => {
        res.write(`<tr>
        <td>${user.MSSV}</td><td style="width : 200px">${user.HoTen}</td>
        <td>${user.NgaySinh}</td>
        <td>${user.Avata}</td>`);
        res.write(`<td><a onclick="location.href='/edit?ID=${user.ID}&MSSV=${user.MSSV}&HoTen=${user.HoTen}&NgaySinh=${user.NgaySinh}&Avata=${user.Avata}'">Edit</a> </td>`);
        res.write(`<td><a href="/delete?ID=${user.ID}&MSSV=${user.MSSV}">Delete</a></td>`);       
      });
    }
    res.write('</table>' );
    res.end();
  }
  function insertHoTen(data, Hoten) {
    let strInputHoTen = '<input class="input-form size-input" name="HoTen" type="text" required />';
    let indexHoTen = data.indexOf(strInputHoTen) + strInputHoTen.length - 2;
    return data.substr(0, indexHoTen) + ` value='${Hoten}'` + data.substr(indexHoTen);
  }
  function insertNgaySinh(data, NgaySinh) { 
    let strInputNgaySinh = ' <input class="input-form size-input" name="NgaySinh" type="date" required />';
    let indexNgaySinh = data.indexOf(strInputNgaySinh) + strInputNgaySinh.length - 2;
    return data.substr(0, indexNgaySinh) + ` value='${NgaySinh}'` + data.substr(indexNgaySinh);  
  }
  function insertAvata(data, Avata) {
    let strInputAvata = '<input class="input-form size-input" name="Avata" type="file" accept=".jpg" required />';
    let indexAvata = data.indexOf(strInputAvata) + strInputAvata.length - 2;
    return data.substr(0, indexAvata) + ` value='${Avata}'` + data.substr(indexAvata);
  }
module.exports = {
  writeItemTable:writeItemTable,
  CreateForm:CreateForm,
  writeEditForm:writeEditForm,
  PageQLSV:PageQLSV
};
