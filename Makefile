.DEFAULT_GOAL := validate

GO ?= go

.PHONY: build ci clean format serve test validate vet

build:
	$(GO) run ./cmd/sites build

ci: validate

clean:
	rm -rf dist

format:
	gofmt -w cmd internal

serve:
	$(GO) run ./cmd/sites serve

test:
	$(GO) test ./...

vet:
	$(GO) vet ./...

validate: test vet build
