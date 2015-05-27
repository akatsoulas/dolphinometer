#!/usr/bin/env python
import sys

import models


def create_db():
    models.db.create_all()

if __name__ == '__main__':
    if len(sys.argv) == 1:
        print 'Use a command'
        sys.exit(1)
    else:
        eval(sys.argv[1])()
