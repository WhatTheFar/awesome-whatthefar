#!/bin/bash

outpath="temp"
# outpath=${BASEPATH%%/}/outpath

while [[ "$1" =~ ^- && ! "$1" == "--" ]]; do case $1 in
    -c | --copy )
        copy=1
        ;;
    -f | --force )
        force=1
        ;;
    -p | --path )
        shift; outpath=$1
        ;;
    -rm | --remove )
        remove=1
        ;;
esac; shift; done
if [[ "$1" == '--' ]]; then shift; fi


if [[ -n "$copy" ]] && [[ ! -d "$outpath" ]] && [[ -e "$outpath" ]]; then
    echo
    echo "'$outpath' is not a directory, can't continue"
    echo "Exit"
    exit
fi


echo "Starting generator ..."
cd packages/generator
rm -rf generated
mkdir -p generated/content
cp -r ../../content/* generated/content

yarn start
cd ../..
echo "  -> Done"


if [[ -n "$copy" ]]; then
    echo

    if [[ -d "$outpath" ]] && [[ -z "$force" ]]; then
        echo "Directory '$outpath' is already exists, delete and continue? [y/n]: "
        read ans
        case "$ans" in
            y | Y | yes)
                ;;
            *)
                echo "Exit"
                exit
                ;;
        esac
    fi

    echo "Copying generated contents to $outpath ..."
    rm -rf $outpath
    mkdir -p $outpath
    cp -r packages/generator/generated/* $outpath
    # cp -r packages/generator/generated/README.md $outpath
    # cp -r packages/generator/generated/content $outpath/content
    # cp -r packages/generator/generated/generated $outpath/generated
    echo '  -> Done'
fi

if [[ -n "$replace" ]]; then
    echo
    echo 'Replacing new generated contents'
    rm -rf content/generated
    cp -r packages/generator/src/generated/README.md .
    cp -r packages/generator/src/generated/content/generated content/generated
    echo '  -> Done'
fi

if [[ -n "$remove" ]]; then
    echo
    echo 'Removing new generated contents'
    rm -rf packages/generator/src/generated
    echo '  -> Done'
fi