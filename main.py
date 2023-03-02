import pandas as pd
import numpy as np
import yfinance as yf
import datetime as dt
import matplotlib.pyplot as plt

start_date = "2022-01-01"
end_date = dt.date.today()
ticker = "AAPL"

def stock_data(start_date, end_date, ticker):
    """
    """
    stock_data = yf.download(ticker, start = start_date, end = end_date)
    return stock_data

print("hello")