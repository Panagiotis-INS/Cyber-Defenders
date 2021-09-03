#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import print_function

import os
import sys

try:
    import olefile
except ImportError:
    print('Module "olefile" is not installed. Try "pip install olefile".', file=sys.stderr)
    sys.exit(-1)

from shutil import copy2
from struct import unpack_from
from argparse import ArgumentParser


__description__ = 'Excel sheet unhider'
__license__ = 'GPL'
__VERSION__ = '1.0.0'
__author__ = 'Vesselin Bontchev'
__email__ = 'vbontchev@yahoo.com'


if sys.version_info[0] >= 3:
    def ord(x):
        return x


def report(message, verbose):
    if verbose:
        print(message)


def process_stream(ole_file, stream_path, args):
    stream = ole_file.openstream(stream_path).read()
    offset = 0
    while offset < len(stream):
        if offset + 4 >= len(stream):
            break
        record_id = unpack_from('<H', stream, offset)[0]
        record_len = unpack_from('<H', stream, offset + 2)[0]
        #report('{:04X}: RecordID: {:04X}, length: {:04X}'.format(offset, record_id, record_len), args.verbose)
        offset += 4
        if args.verbose and record_id == 0x0809:
            # BOF
            if offset + 2 >= len(stream):
                break
            is_biff8 = ord(stream[offset + 1]) == 0x06
        elif record_id == 0x0085:
            # BOUNDSHEET
            if offset + 8 >= len(stream):
                break
            grbit = ord(stream[offset + 4])
            if args.verbose:
                if grbit & 0x0003 == 1:
                    state = ' (hidden)'
                elif grbit & 0x0003 == 2:
                    state = ' (very hidden)'
                else:
                    state = ''
                cch = ord(stream[offset + 6])
                name_offset = offset + 7 + int(is_biff8)
                if name_offset + cch >= len(stream):
                    break
                sheet_name = stream[name_offset:name_offset + cch]
                report('\t\tFound BOUNDSHEET record ({}){}.'.format(sheet_name, state), True)
                if not args.dryrun and len(state):
                    report('\t\t\t...unhiding.', True)
            if not args.dryrun:
                grbit &= ~0x03
                replacement = bytes([grbit]) if sys.version_info[0] >= 3 else chr(grbit)
                stream = stream[:offset + 4] + replacement + stream[offset + 5:]
        offset += record_len
    if not args.dryrun:
        ole_file.write_stream(stream_path, stream)


def processFile(file_name, args):
    report('Processing file: {}...'.format(file_name), args.verbose)
    if not olefile.isOleFile(file_name):
        report('\tNot an OLE2 file.', args.verbose)
        return
    if args.backup:
        new_name = file_name + '_UNHIDDEN.xls'
        report('\tMaking a copy to work on in {}.'.format(new_name), args.verbose)
        copy2(file_name, new_name)
        file_name = new_name
    with olefile.OleFileIO(file_name, write_mode=not args.dryrun) as ole_file:
        streams = ole_file.listdir()
        for path in streams:
            for stream in path:
                if stream == 'Book' or stream == 'Workbook':
                    stream_path = '/'.join(path)
                    report('\tProcessing stream {}...'.format(stream_path), args.verbose)
                    process_stream(ole_file, stream_path, args)


def main():
    parser = ArgumentParser(description='Dumps the p-code of VBA-containing documents.')
    parser.add_argument('-v', '--version', action='version',
                        version='%(prog)s version {}'.format(__VERSION__))
    parser.add_argument('-n', '--norecurse', action='store_true',
                        help="Don't recurse into directories")
    parser.add_argument('-c', '--backup', action='store_true',
                        help='Save the result to a new file')
    parser.add_argument('-b', '--verbose', action='store_true',
                        help='Verbose information')
    parser.add_argument('-d', '--dryrun', action='store_true',
                        help="Don't actually do anything (use with -b)")
    parser.add_argument('fileOrDir', nargs='+', help='File or dir')
    args = parser.parse_args()
    for name in args.fileOrDir:
        if os.path.isdir(name):
            for name, subdirList, fileList in os.walk(name):
                for fname in fileList:
                    full_name = os.path.join(name, fname)
                    processFile(full_name, args)
                if args.norecurse:
                    while len(subdirList) > 0:
                        del(subdirList[0])
        elif os.path.isfile(name):
            processFile(name, args)
        else:
            print('{} does not exist.'.format(name), file=sys.stderr)


if __name__ == '__main__':
    main()
