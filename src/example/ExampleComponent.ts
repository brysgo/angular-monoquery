import { Component, Inject, forwardRef } from "@angular/core";
import { map } from "rxjs/operators";
import { Fragments } from "../";

import gql from "graphql-tag";

export function createExampleComponent(MonoProvider, otherFragments = {}) {
  @Fragments({
    fragments: {
      simpleFragment: gql`
        fragment SimpleFragment on Query {
          hello
        }
      `,
      ...otherFragments,
    },
  })
  @Component({
    selector: "example-component",
    template: "{{jsonData | async}}",
  })
  class ExampleComponent {
    static fragments: any;
    monoProvider: any;
    jsonData: string;
    data: any;
    constructor(
      @Inject(forwardRef(() => MonoProvider))
      monoProvider: typeof MonoProvider
    ) {
      this.monoProvider = monoProvider;
      this.jsonData = this.data.pipe(map((d) => JSON.stringify(d)));
    }

    getKeyProp() {
      return "b";
    }
  }
  return ExampleComponent;
}
