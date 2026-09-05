package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/nandiheath/sites.nandi.sh/internal/sitebuild"
)

func main() {
	log.SetFlags(0)
	if len(os.Args) < 2 {
		usage()
		os.Exit(2)
	}

	switch os.Args[1] {
	case "build":
		build(os.Args[2:])
	case "serve":
		serve(os.Args[2:])
	default:
		usage()
		os.Exit(2)
	}
}

func build(args []string) {
	flags := flag.NewFlagSet("build", flag.ExitOnError)
	root := flags.String("root", ".", "repository root")
	output := flags.String("out", "dist", "output directory")
	flags.Parse(args)

	sites, err := sitebuild.Build(*root, *output)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Built %d site(s) into %s\n", len(sites), *output)
}

func serve(args []string) {
	flags := flag.NewFlagSet("serve", flag.ExitOnError)
	root := flags.String("root", ".", "repository root")
	output := flags.String("out", "dist", "output directory")
	address := flags.String("address", "127.0.0.1:4173", "listen address")
	flags.Parse(args)

	sites, err := sitebuild.Build(*root, *output)
	if err != nil {
		log.Fatal(err)
	}
	absoluteOutput, err := filepath.Abs(*output)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Serving %d site(s) from %s at http://%s\n", len(sites), absoluteOutput, *address)
	log.Fatal(http.ListenAndServe(*address, http.FileServer(http.Dir(absoluteOutput))))
}

func usage() {
	fmt.Fprintln(os.Stderr, "usage: sites <build|serve> [options]")
}
