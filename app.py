from flask import Flask
from flask import jsonify,render_template,redirect,url_for,request,abort,make_response
import subprocess
app = Flask(__name__)


@app.route('/')
def generate():
    command = 'th sample.lua -checkpoint cv/checkpoint_4650.t7 -length 200 -gpu -1'
    
    result = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE).stdout.read()
    
    # remove console stats output
    result = result.split('\n', 1)[1].split('\n', 1)[1].split('\n', 1)[1]
    
    response = make_response(result, 200)
    response.mimetype = "text/plain"
    return response
