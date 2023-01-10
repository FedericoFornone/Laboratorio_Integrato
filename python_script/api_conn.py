# importing the module
import os

from flask import Flask, redirect, url_for, request, send_file, send_from_directory
from werkzeug.utils import secure_filename


UPLOAD_FOLDER = '..\DataSet'
ALLOWED_EXTENSIONS = set(['csv'])

# initiating flask object
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_filename(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/read_file', methods=['GET'])
def read_uploaded_file():
    filename = secure_filename(request.args.get('filename'))
    try:
        if filename and allowed_filename(filename):
            with open(os.path.join(app.config['UPLOAD_FOLDER'], filename)) as f:
                return f.read()
    except IOError:
        pass
    return "Unable to read file"

# defining a route in the application
@app.route('/get_provincia/<provincia>')
def get_provincia(provincia):
    try:
        return send_from_directory(directory='../data_analysis/eda_province.ipynb',
                                   filename='eda_province.ipynb',
                                   mimetype='application/ipynb')
        # return send_file('../data_analysis/eda_province.ipynb')
    except Exception as e:
        return str(e)


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['provincia']
        return redirect(url_for('greet', name=user))
    else:
        user = request.args.get('provincia')
        return redirect(url_for('greet', name=user))


# calling  main
if __name__ == '__main__':
    # setting the debugging option for the application instance
    app.debug = True
    # launching the flask's integrated development webserver
    app.run()
