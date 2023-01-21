from flask import Flask

# initiating flask object
app = Flask(__name__)


@app.route('/abruzzo', methods=['GET'])
def get_data():
    data = open('../Data/final_data/abruzzo.json')
    return data


# calling  main
if __name__ == '__main__':
    # setting the debugging option for the application instance
    app.debug = True
    # launching the flask's integrated development webserver
    app.run()
