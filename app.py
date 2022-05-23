import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, render_template, jsonify

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///sql/allstock.sqlite")
connection = engine.connect()

# Execute sql query
stocks = engine.execute("SELECT * FROM Stocks WHERE date >= '2017-01-01'").all()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
# Starting Page
@app.route("/")
def home():
    return render_template("index.html")

# Index/Home (To deal with goin back to the home page)
@app.route("/index")
def index():
    return render_template("index.html")

# About Us Section
@app.route("/aboutus")
def aboutus():
    return render_template("aboutus.html")

# Rawdata Section
@app.route("/rawdata")
def rawdata():
    return render_template("rawdata.html")

# API Section
@app.route("/api")
def api():
    return render_template("api.html")

# Industry Section
@app.route("/banking")
def banking():
    return render_template("banking.html")

@app.route("/pharma")
def pharm():
    return render_template("pharma.html")

@app.route("/tech")
def tech():
    return render_template("tech.html")

# Test Section
@app.route("/test")
def test():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/all_stocks<br/>"
        f"<br>"
        f"Return Home Link (copy into search bar)<br>"
        f"https://traciediepbautista.github.io/StockAnalytics/index.html"
    )

# API JSON 
@app.route("/api/v1.0/all_stocks")
def all_stocks():
    # Create our session (link) from Python to the sqlite
    session = Session(engine)

    """Return a list of all stocks"""
    # Query all stocks
    results = stocks

    # Close session
    session.close()

    all_stocks = []
    for index, date, open_price, high_price, low_price, close_price, volume, Symbol, Name, Industry in results:
        stock_dict = {}
        # stock_dict["index"] = index
        stock_dict["date"] = date
        stock_dict["open"] = open_price
        stock_dict["high"] = high_price
        stock_dict["low"] = low_price
        stock_dict["close"] = close_price
        stock_dict["volume"] = volume
        stock_dict["symbol"] = Symbol
        stock_dict["name"] = Name
        stock_dict["industry"] = Industry
        all_stocks.append(stock_dict)

    return jsonify(all_stocks)

# @app.route("/api/v1.0/")
# def ():
#     return()

if __name__ == '__main__':
    app.run(debug = True)
